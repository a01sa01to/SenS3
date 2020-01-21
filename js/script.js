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

const π = Math.PI;
const selector = "canvas";
const bgColor = "#222";


class Canvas{
	constructor(){}

	/**
	 * @description Canvas要素を取得
	 * @returns {HTMLElement} Canvas
	 */
	get = ()=>document.querySelector(selector);

	/**
	 * @description Contextを取得
	 * @returns {CanvasRenderingContext2D} Context
	 */
	context = function(){ return this.get().getContext('2d'); };

	/**
	 * @description サイズを取得
	 * @returns {{width: Number, height: Number}} サイズ
	 */
	size = function(){ return {width: this.get().width, height: this.get().height}; };

	/**
	 * @description パーセントをpxに変換
	 * @param {Number} per パーセント(Min: 0, Max: 100)
	 * @param {String} dir "x" or "y"
	 * @returns {Number} px
	 */
	p2x = function(per, dir){
		switch(dir){
			case "x":
				return this.size().width / 100 * per;
			case "y":
				return this.size().height / 100 * per;
			default:
				throw new Error("2nd Argument is invalid: "+dir);
		}
	};

	/**
	 * @description 色を変える
	 * @param {String} c カラーコード
	 */
	color = function(c){ this.context().fillStyle=c; this.context().strokeStyle=c; return this; };

	/**
	 * @description 長方形を描画
	 * @param {Number} x x座標
	 * @param {Number} y y座標
	 * @param {Number} dx 幅
	 * @param {Number} dy 高さ
	 * @param {Boolean} [fill = true] 埋めるか
	 */
	rect = function(x,y,dx,dy, fill=true){
		this.context().beginPath();1
		this.context().moveTo(0,0);
		this.context().moveTo(x,y);
		this.context().lineTo(x+dx,y);
		this.context().lineTo(x+dx,y+dy);
		this.context().lineTo(x,y+dy);
		this.context().lineTo(x,y);
		fill?this.context().fill():this.context().stroke();
		return this;
	};

	/**
	 * @description 範囲内を消す
	 * @param {Number} x x座標
	 * @param {Number} y y座標
	 * @param {Number} dx 幅
	 * @param {Number} dy 高さ
	 */
	clear = function(x,y,dx,dy){
		const nowColor = this.context().fillStyle;
		this.color(bgColor).rect(x,y,dx,dy).color(nowColor);
		return this;
	};

	/**
	 * @description Canvas内をすべて消す
	 */
	clearAll = function(){ this.clear(0,0, this.size().width, this.size().height); return this; };

	/**
	 * @description テキストを描画
	 * @param {Number} x x座標
	 * @param {Number} y y座標
	 * @param {String} txt 描画する文字列
	 * @param {{style: String, align: String, baseline: String, dir:String}} font フォントの書式設定
	 * @param {Boolean} [fill = true] 埋めるか
	 */
	text = function(x,y,txt,font={},fill=true){
		const argFontDef = {
			style: "10px sans-selif",
			align: "left",
			baseline: "top",
			dir: "ltr"
		}
	
		for (const key in argFontDef) {
			if(!font.hasOwnProperty(key)) {
				font[key] = argFontDef[key];
			}
		}
	
		this.context().font = font.style;
		this.context().textAlign = font.align;
		this.context().textBaseline = font.baseline;
		this.context().direction = font.dir;
		fill?this.context().fillText(txt,x,y):this.context().strokeText(txt,x,y);
		return this;
	};

	/**
	 * @description 円を描画
	 * @param {Number} x 中心のx座標
	 * @param {Number} y 中心のy座標
	 * @param {Number} r 半径
	 * @param {Boolean} [fill = true] 埋めるか
	 */
	circle = function(x,y,r,fill=true){
		this.context().arc(x,y,r,0, 2*π);
		fill?this.context().fill():this.context().stroke();
		return this;
	};

	/**
	 * @description 画像を描画
	 * @param {Number} x x座標
	 * @param {Number} y y座標
	 * @param {Number} dx 幅
	 * @param {Number} dy 高さ
	 * @param {String} url 画像のURL
	 */
	image = function(x,y,dx,dy,url){
		const img = document.createElement("img");
		img.src = url;
		img.onload = function(){
			canv.context().drawImage(img,x,y,dx,dy);
		}
		return this;
	};

	/**
	 * @description n分割線(3px)を引く
	 * @param {String} dir 分割方向("x" or "y" 軸に垂直な線が引かれる)
	 * @param {Number} n 何分割するか
	 * @param {Number} where どこから引くか
	 * @param {Number} length 線の長さ
	 * @param {String} [color = "#bbb"] 線の色
	 */
	split = function(dir,n,where,length,color="#bbb"){
		const s = this.p2x(100/n,dir);
		const nowColor = this.context().fillStyle;
		this.color(color);
		for(let i=1; i<n; i++){
			switch(dir){
				case "x":
					this.rect(s*i, where, 3, length);
					break;
				case "y":
					this.rect(where,s*i, length, 3);
					break;
				default:
					throw new Error(`1st Argument is invalid: ${dir}`);
			}
		}
		this.color(nowColor);
		return this;
	};
}

class Block extends Canvas{
	constructor(begin, end){
		super();
		this.begin = parseInt(begin,36);
		this.end = parseInt(end, 36);
		this.x = this.begin * 22;
		this.y = 5;
		this.dx = (this.end - this.begin + 1) * 20;
		this.dy = 5;
		this.color("#f00").rect(this.x, this.y, this.dx, this.dy);
		return this;
	}
	move = function(x,y){
		this.clear(this.x,this.y,this.dx,this.dy);
		this.rect(this.x+x, this.y+y, this.dx,this.dy);
		return this;
	}
}

window.addEventListener("load",()=>{
	const canv = new Canvas();

	canv.color(bgColor)
		.rect(0,0,canv.size().width, canv.size().height)  // 全体を#222で塗りつぶし
		.color("#555")
		.rect(0,canv.p2x(80,"y"),canv.size().width,canv.p2x(20,"y"))  // 下の部分 20%
		.split("x",3,canv.p2x(80,"y"),canv.p2x(20,"y"));  // 下部分を3分割

	window.canv = canv;
});
