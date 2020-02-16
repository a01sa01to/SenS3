import {bgColor} from "./variables";
import {Canvas, Block} from "./class";
import {buttonOnClick, songSelect} from "./dom";
// import {dataStore} from "./gsa";

window.addEventListener("load",()=>{
	const canv = new Canvas();

	canv.color(bgColor)
		.rect(0,0,canv.size().width, canv.size().height)  // 全体を#222で塗りつぶし
		.color("#555")
		.rect(0,canv.p2x(85,"y"),canv.size().width,canv.p2x(15,"y"))  // 下の部分
		.split("x",5,canv.p2x(85,"y"),canv.p2x(15,"y"));  // 下部分を3分割

	window.canv = canv;

	buttonOnClick();
	songSelect();
	// $(window).click(()=>{
	// 	document.querySelector("html").requestFullscreen();
	// })
	// window.test = dataStore;
});
