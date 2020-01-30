import {sleep, anim} from "./function";
const $ = require("jquery");

const buttonOnClick = ()=>{
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
	});
}

const songSelectAnime = async e=>{
	const rate = 1;
	if(e.length <= 0){
		return;
	}

	if(e.hasClass("show")){
		e.animate({height: Number(e.attr("data-closeH"))}, 500*rate);
		await sleep(400*rate);
		e.children(".note").hide();
		e.children(".intro").hide();
		e.children(".composer").hide();
		e.children(".ratio").hide();
		e.children("button").hide();
		$("#playbtnContainer").hide();
		e.removeClass("show");
		e.children(".composer").fadeIn(200*rate);
		e.children(".ratio").fadeIn(200*rate);
		await sleep(600*rate);
	}
	else{
		$("#playbtnContainer").hide();
		e.children(".composer").fadeOut(200*rate);
		e.children(".ratio").fadeOut(200*rate);
		await sleep(200*rate);
		e.children(".composer").fadeIn(200*rate);
		e.children(".ratio").fadeIn(200*rate);
		e.animate({height: Number(e.attr("data-openH"))+Number(e.attr("data-btnH"))}, 500*rate);
		e.children(".note").slideDown(300*rate);
		e.children(".intro").slideDown(300*rate);
		e.children("button").slideDown(300*rate);
		e.addClass("show");
		await sleep(200*rate);
		$("#playbtnContainer").css({display: "flex"});
		await sleep(400*rate);
	}
	e.css("height","auto");
}

const songSelect = ()=>{
	$("div.container.select").css({display: "block", left: "-10000px"});
	$("#playbtnContainer").css({display: "block", left: "-10000px"});
	const playBtn = $("#playbtnContainer").outerHeight();

	$("div.container.select div.song").each(function(){
		$(this).attr("data-btnH", playBtn);
		$(this).attr("data-closeH", $(this).innerHeight());
		$(this).addClass("show");
		$(this).attr("data-openH", $(this).innerHeight());
		$(this).removeClass("show");
	})

	new Array("div.container.select","#playbtnContainer").forEach(e=>{
		$(e).removeAttr("style");
	});


	$("div.container.select div.song").click(async function(){
		if(!$(this).hasClass("show")){
			await songSelectAnime($(this).parent().children("div.song.show"));
			$("#playbtnContainer").hide().insertAfter($(this).children("p.intro")).hide();
		}
		await songSelectAnime($(this));
	})
}

export {buttonOnClick, songSelect};