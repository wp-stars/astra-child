import axios from 'axios';
import domReady from '@wordpress/dom-ready';
import Qs from 'qs';
import {__} from '@wordpress/i18n';

let categoryId = -1,
	offset = 0;

const {ajaxUrl} = wpVars;
const {postID, currentPageCategory} = reactVars;

domReady(() => {
	const archiveGrid = document.querySelector('.ls-shortcode-news-archive__grid'),
		filterLinks = document.querySelectorAll('a.ls-shortcode-news-archive__filter__link'),
		loadMoreButton = document.querySelector('.ls-shortcode-news-archive__load-more__link'),
		mobileFilter = document.querySelectorAll('.ls-shortcode-news-archive__filter__mobile');

	const getFilteredPosts = async () => {
		try {
			const config = {
				method: 'POST',
				url: ajaxUrl,
				data: Qs.stringify({
					url: ajaxUrl,
					method: 'POST',
					action: 'ls_shortcodes_news_archive_filter_posts',
					categoryId: categoryId,
					offset: offset,
					headers: {'content-type': 'application/json'},
					post_id: postID,
				}),
			};

			const response = await axios(config);

			// replace content of archive grid with fetched posts
			if (response.data.posts) {
				archiveGrid.innerHTML = response.data.posts;
			} else {
				archiveGrid.innerHTML = '<p class="ls-reference-error">' + __('No entries available, please select another filter.', 'iwgplating') + '</p>';
			}

			// hide/show load more button if posts are available
			if (response.data.moreAvailable) {
				loadMoreButton.classList.remove('ls-shortcode-news-archive__load-more--hidden');
			} else {
				loadMoreButton.classList.add('ls-shortcode-news-archive__load-more--hidden');
			}

			// reset offset after loading new posts
			offset = 0;
		} catch (e) {
			archiveGrid.innerHTML = '<p class="ls-reference-error">' + __('Oops... Something went wrong. Please reload the page.', 'iwgplating') + '</p>';
			loadMoreButton.classList.add('ls-shortcode-news-archive__load-more--hidden');
		}
	};

	const getMorePosts = async () => {
		try {
			const config = {
				method: 'POST',
				url: ajaxUrl,
				data: Qs.stringify({
					url: ajaxUrl,
					method: 'POST',
					action: 'ls_shortcodes_news_archive_filter_posts',
					categoryId: categoryId,
					offset: offset,
					headers: {'content-type': 'application/json'},
					post_id: postID,
				}),
			};

			const response = await axios(config);

			// add more posts to archiveGrid
			if (response.data.posts) {
				archiveGrid.innerHTML += response.data.posts;
			}

			// remove load more button if no more posts available
			if (!response.data.moreAvailable) {
				loadMoreButton.classList.add('ls-shortcode-news-archive__load-more--hidden');
			}
		} catch (e) {
			archiveGrid.innerHTML = '<p class="ls-reference-error">' + __('Oops... Something went wrong. Please reload the page.', 'iwgplating') + '</p>';
			loadMoreButton.classList.add('ls-shortcode-news-archive__load-more--hidden');
		}
	};

	// load new posts on filter/category click
	filterLinks.forEach((elem) => {
		elem.addEventListener('click', (evt) => {
			evt.preventDefault();
			document.querySelector('.ls-shortcode-news-archive__filter__link--active').classList.remove('ls-shortcode-news-archive__filter__link--active');

			categoryId = evt.target.dataset.category;
			// reset offset & page category after using filters
			offset = 0;
			getFilteredPosts();

			elem.classList.add('ls-shortcode-news-archive__filter__link--active');
		});
	});

	// load new posts on filter select input field change for mobile
	mobileFilter.forEach((elem) => {
		elem.addEventListener('change', (evt) => {
			evt.preventDefault();
			categoryId = evt.target.value;
			// reset offset & page category after using filters
			offset = 0;
			getFilteredPosts();
		});
	});

	// load more posts on load more button click
	loadMoreButton.addEventListener('click', (evt) => {
		evt.preventDefault();
		offset = archiveGrid.childElementCount;
		getMorePosts();
	});
});
