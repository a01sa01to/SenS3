import {sleep, waitUntil} from "./function";
import {bgColor} from "./variables";
import {Canvas, Block} from "./class";
const $ = require("jquery");

window.addEventListener("load",()=>{
	const canv = new Canvas();

	canv.color(bgColor)
		.rect(0,0,canv.size().width, canv.size().height)  // 全体を#222で塗りつぶし
		.color("#555")
		.rect(0,canv.p2x(85,"y"),canv.size().width,canv.p2x(15,"y"))  // 下の部分
		.split("x",5,canv.p2x(85,"y"),canv.p2x(15,"y"));  // 下部分を3分割

	window.canv = canv;

	const anim = async (before, after, isR2L=true)=>{
		const outW = (isR2L?(-window.outerWidth):(window.outerWidth));
		$(before).animate({ left: outW }, 200)
		await sleep(200);
		$(before).removeClass("showing");
		await sleep(600);
		$(after).addClass("showing").css({left: -outW}).animate({left: 0},200);
	}
	$("div.btnContainer button#play").click(()=>{
		anim(".container.start", ".container.select");
	});
	$("div.btnContainer button#news").click(()=>{
		anim(".container.start", ".container.news");
	});
	$("div.btnContainer button#links").click(()=>{
		anim(".container.start", ".container.links");
	});
	$("div.container header button.back").click(function(){
		anim(`.container.${$(this).attr("data-from")}`, `.container.${$(this).attr("data-to")}`,false);
	})
});
