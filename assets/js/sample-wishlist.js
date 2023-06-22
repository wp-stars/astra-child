import {getCookie, setCookie} from './common';
import axios from 'axios';
import jquery from 'jquery';
const {postID} = wpVars;

const orderSampleButton = document.querySelector('#add-to-sample-wishlist');
const removeFromWishlistButtons = document.querySelectorAll('.ls-selected-sample .ls-sample-wishlist__item_button');
const wishlistButton = document.querySelector('.ast-header-button-2 .ast-custom-button-link');
const wishlistButtonMobile = document.querySelector('#ast-mobile-header .ast-header-button-2 .ast-custom-button-link');

function getWishlist() {
	const wishlistJSON = getCookie('wishlist=');
	const wishlist = [];
	for (let i in wishlistJSON) {
		wishlist.push(wishlistJSON[i]);
	}
	return wishlist;
}

function updateWishlistButton(number) {
	const wishlistNumbers = document.querySelectorAll('.ls-wishlist-number');

	if (number > 0) {
		if (wishlistNumbers.length === 0) {
			const numberHTML = document.createElement('span');
			numberHTML.classList.add('ls-wishlist-number');
			const numberContent = document.createTextNode(number);
			numberHTML.appendChild(numberContent);
			if (wishlistButton) {
				wishlistButton.appendChild(numberHTML);
			}
			if (wishlistButtonMobile) {
				wishlistButtonMobile.appendChild(numberHTML.cloneNode(true));
			}
		} else if (wishlistNumbers.length > 0) {
			wishlistNumbers.forEach((wishlistNumber) => {
				wishlistNumber.innerText = number;
			});
		}
	} else {
		wishlistNumbers.forEach((wishlistNumber) => {
			wishlistNumber.remove();
		});
	}
}

function setWishlist(event) {
	event.preventDefault();
	const wishlist = getWishlist();
	orderSampleButton.classList.toggle('ls-sample-added');

	let isDuplicate = false;
	wishlist.forEach((item) => {
		if (item === postID.toString()) {
			isDuplicate = true;
		}
	});

	if (!isDuplicate) {
		if (wishlist.length >= 3) {
			wishlist.shift();
		}
		wishlist.push(postID);

		setCookie('wishlist', wishlist);
	}
	updateWishlistButton(wishlist.length);
	orderSampleButton.removeEventListener('click', setWishlist);
}

function removeFromWishlist(event) {
	event.preventDefault();
	const productID = event.target.parentElement.dataset.id;
	const productHTML = event.target.parentElement.parentElement;

	const wishlist = getWishlist();
	let itemToRemove = -1;
	wishlist.forEach((item, index) => {
		if (item === productID) {
			itemToRemove = index;
		}
	});

	if (itemToRemove >= 0) {
		if (wishlist.length === 1) {
			document.cookie = 'wishlist=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			updateWishlistButton(0);
		} else {
			wishlist.splice(itemToRemove, 1);
			setCookie('wishlist', wishlist);
			updateWishlistButton(wishlist.length);
		}

		const rowMarkup = productHTML.childNodes;
		productHTML.classList.remove('ls-selected-sample');
		productHTML.classList.add('ls-empty-sample');
		rowMarkup.forEach((element) => {
			if (element.classList.contains('ls-sample-wishlist__item_image')) {
				element.innerText = '';
			} else if (element.classList.contains('ls-sample-wishlist__item_name')) {
				element.lastChild.remove();
				element.appendChild(document.createTextNode(' ----'));
			} else if (element.classList.contains('ls-sample-wishlist__item_color')) {
				element.lastChild.remove();
				element.appendChild(document.createTextNode(' ----'));
			} else if (element.classList.contains('ls-sample-wishlist__item_button')) {
				element.removeEventListener('click', removeFromWishlist);
			}
		});
		setSamples(getWishlist());
	}
}

if (orderSampleButton) {
	const wishlist = getWishlist();
	let itemInList = false;
	wishlist.forEach((item) => {
		if (item === postID) {
			itemInList = true;
		}
	});

	if (itemInList) {
		orderSampleButton.classList.toggle('ls-sample-added');
	} else {
		orderSampleButton.addEventListener('click', setWishlist);
	}
}

if (removeFromWishlistButtons) {
	removeFromWishlistButtons.forEach((button) => {
		button.addEventListener('click', removeFromWishlist);
	});
}

if (wishlistButton || wishlistButtonMobile) {
	const wishlist = getWishlist();
	const number = wishlist.length;
	updateWishlistButton(number);
}

const setSamples = async (wishlist) => {
	try {
		const response = await axios({
			method: 'GET',
			url: '/wp-json/ls/v1/samples/',
			params: {
				wishlist: wishlist,
			},
		});
		if (response?.data) {
			hiddenField.setAttribute('value', response.data.products);
			return true;
		}
		return false;
	} catch (error) {
		return false;
	}
};

const hiddenField = document.querySelector('.ls-hidden-samples input');
if (hiddenField) {
	setSamples(getWishlist());
}

const formContainer = document.querySelector('.ls-sample-form');
if (formContainer) {
	formContainer.addEventListener('DOMNodeInserted', function (e) {
		if (e.target.classList) {
			if (e.target.classList.contains('wpforms-confirmation-container-full')) {
				document.cookie = 'wishlist=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
				updateWishlistButton(0);
				const wishlistButtons = document.querySelectorAll('.ls-sample-wishlist__item_button a');

				wishlistButtons.forEach((button) => {
					button.classList.add('ls-disabled');
				});
			}
		}
	});
}
