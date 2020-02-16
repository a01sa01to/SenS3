import {sleep, anim, getBytes} from "./function";
import {name2music} from "./list";
import {play} from "./playsong"
const $ = require("jquery");

const buttonOnClick = ()=>{
	$("div.btnContainer button#play").click(()=>{
		anim(".container.start", ".container.select");
	});
	$("div.btnContainer button#news").click(()=>{
		anim(".container.start", ".container.news");
	});
	$("div.btnContainer button#link").click(()=>{
		anim(".container.start", ".container.links");
	});
	$("div.btnContainer button#help").click(()=>{
		anim(".container.start", ".container.help");
	});
	$("div.container header button.back").click(function(){
		anim(`.container.${$(this).attr("data-from")}`, `.container.${$(this).attr("data-to")}`,false);
	});
	$("div.container.select #playbtnContainer button#play").click(function(){
		name2music($(this).parents(".song").children("p.title").text()).fadeOut();
		anim(".container.select", ".container.game");
		$(".container.game canvas").hide();
		play($(this).parents(".song").children("p.title").text());
	})
}

let animating = false;

const songSelectAnime = async e=>{
	const rate = 1;
	await sleep(50);
	if(animating) return;
	if(e.length <= 0){ return; }

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
		name2music(e.children(".title").text()).fadeOut();
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
		e.children(".note").show().height(0).animate({height: Number(e.children(".note").attr("data-openH"))}, 300*rate);
		e.children(".intro").show().height(0).animate({height: Number(e.children(".intro").attr("data-openH"))}, 300*rate);
		e.children("button").slideDown(300*rate);
		e.addClass("show");
		await sleep(200*rate);
		$("#playbtnContainer").css({display: "flex"});
		await sleep(400*rate);
		name2music(e.children(".title").text()).fadeIn();
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
		$(this).children().each(function(){
			$(this).attr("data-openH", $(this).innerHeight());
		})
		$(this).removeClass("show");
	})

	new Array("div.container.select","#playbtnContainer").forEach(e=>{
		$(e).removeAttr("style");
	});

	$("div.container.select #playbtnContainer").click(async function(){
		animating = true;
		await sleep(1000);
		animating = false;
	})

	$("div.container.select div.song").click(async function(){
		if(!$(this).hasClass("show")){
			songSelectAnime($(this).parent().children("div.song.show"));
			$("#playbtnContainer").hide().insertAfter($(this).children("p.intro")).hide();
			await sleep(200);
		}
		await songSelectAnime($(this));
	})
}

export {buttonOnClick, songSelect};