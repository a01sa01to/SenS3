const $ = require("jquery");

/**
 * @description 指定された秒数待ちます。Async/Await Only
 * @param {Number} t 時間(ms)
 * @returns {Promise} Timeout
 */
const sleep = async t => new Promise(r=>setTimeout(r,t));


const waitUntil = async (...e)=>{
	if(e.length === 1){
		if(document.querySelector(e[0])){
			return;
		}
		await sleep(300);
		await waitUntil(e);
		return;
	}
	e.forEach(async _=>{
		await waitUntil(_);
	});
}

/**
 * @description スライドアニメーション
 * @param {String} before 直前に表示されているコンテナ
 * @param {String} after 表示される予定のコンテナ
 * @param {Boolean} [isR2L = true] 右to左のアニメーションか
 */
const anim = async (before, after, isR2L=true)=>{
	const outW = (isR2L?(-window.outerWidth):(window.outerWidth));
	$(before).animate({ left: outW }, 200)
	await sleep(200);
	$(before).removeClass("showing");
	await sleep(600);
	$(after).addClass("showing").css({left: -outW}).animate({left: 0},200);
}

const getBytes = e=>encodeURIComponent(e).replace(/%../g,"x").length;

export {sleep, waitUntil, anim, getBytes};