import {Music} from "./class";
import {sleep} from "./function";
import {name2path, name2music} from "./list";
const $ = require("jquery");

const play = async m=>{
	let scoreData = "";
	await fetch(`scores/${name2path(m)}.sens3`).then(r=>r.text()).then(t=>{scoreData=t});
	scoreData = scoreData.split(",");
	await sleep(3000);

	$(".container.game .loader").hide();
	$(".container.game canvas").show();
	await sleep(3000);
	for(let i=0; i<scoreData.length; i++){
		console.log("hogehoge")
		await sleep(25);  // 40fps
	}

}

export {play}