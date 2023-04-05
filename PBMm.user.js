// ==UserScript==
// @name         VK Pixel Battle Minimap | KxZ
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  VK Pixel Battle Minimap.\n Adapted MLP Pixel Minimap 1.3.11
// @author       Endless Night, ConsoleBey, olbld (aka sheffchinski)
// @grant 		 GM_xmlhttpRequest
// @grant 		 unsafeWindow
// @require		 https://raw.githubusercontent.com/mitchellmebane/GM_fetch/master/GM_fetch.min.js
// @connect		 githubusercontent.com
// @connect		 imgur.com
// @connect		 github.io
// @connect		 github.com
// @connect      localhost
// @connect		 glitch.me
// @match        *://vk.com/*
// @include      https://prod-app*
// @updateURL    https://raw.githubusercontent.com/caprallex/PBMm/master/PBMm.user.js
// @downloadURL  https://raw.githubusercontent.com/caprallex/PBMm/master/PBMm.user.js
// ==/UserScript==

[
	['https://prod-app*', 'https://raw.githubusercontent.com/caprallex/PBMm/master/code.js'],
].forEach(([reg, src]) => {
	if (new RegExp(reg).test(location.href)) {
		console.log(`trigger "${reg}"\nload code from "${src}"`);
		fetch(src)
		.then(res => {
			if (res.readyState !== res.DONE) {
				return;
			}

			if (res.status !== 200) {
				alert(`cant load script\ncode: ${res.status}\nreason: ${res.statusText}`);
				return;
			}

			return res.text()
		})
		.then(code => {
			new Function("const [self, GM, unsafeWindow] = arguments;\n" + code)(self, GM, unsafeWindow);
		});
	}
});
