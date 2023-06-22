document.getElementById('ls-mail-share-button').addEventListener('click', () => {
	const url = 'mailto:?subject=IWG%20Plating%20Job&body=' + window.location.href;
	const options = 'toolbar=0,status=0,resizable=1,width=626,height=436';
	window.open(url, 'sharer', options);
});

document.getElementById('ls-facebook-share-button').addEventListener('click', () => {
	const url = 'https://www.facebook.com/sharer.php?display=popup&u=' + window.location.href;
	const options = 'toolbar=0,status=0,resizable=1,width=626,height=436';
	window.open(url, 'sharer', options);
});

document.getElementById('ls-linkedin-share-button').addEventListener('click', () => {
	const url = 'https://www.linkedin.com/sharing/share-offsite/?url=' + window.location.href;
	const options = 'toolbar=0,status=0,resizable=1,width=626,height=436';
	window.open(url, 'sharer', options);
});
