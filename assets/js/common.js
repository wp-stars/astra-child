export function getCookie(prefix) {
	let markupJSON = '';
	const cookies = document.cookie;
	const start = cookies.indexOf(prefix);
	if (start > -1) {
		let end = document.cookie.indexOf(';', start);
		if (end === -1) {
			end = cookies.length;
		}
		markupJSON = JSON.parse(cookies.substring(start + prefix.length, end));
	}
	return markupJSON;
}

export function setCookie(prefix, content) {
	const jsonString = JSON.stringify(content);
	const date = new Date();
	date.setDate(date.getDate() + 30);
	document.cookie = `${prefix}=${jsonString};Path=/; Expires=${date.toUTCString()};`;
}
