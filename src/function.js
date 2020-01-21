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

export {sleep, waitUntil};