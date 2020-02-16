import {π, selector, bgColor} from "./variables";
import {sleep} from "./function";

class Canvas{
	constructor(){}

	/**
	 * @description Canvas要素を取得
	 * @returns {HTMLElement} Canvas
	 */
	get(){ return document.querySelector(selector) };

	/**
	 * @description Contextを取得
	 * @returns {CanvasRenderingContext2D} Context
	 */
	context(){ return this.get().getContext('2d'); };

	/**
	 * @description サイズを取得
	 * @returns {{width: Number, height: Number}} サイズ
	 */
	size(){ return {width: this.get().width, height: this.get().height}; };

	/**
	 * @description パーセントをpxに変換
	 * @param {Number} per パーセント(Min: 0, Max: 100)
	 * @param {String} dir "x" or "y"
	 * @returns {Number} px
	 */
	p2x(per, dir){
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
	color(c){ this.context().fillStyle=c; this.context().strokeStyle=c; return this; };

	/**
	 * @description 長方形を描画
	 * @param {Number} x x座標
	 * @param {Number} y y座標
	 * @param {Number} dx 幅
	 * @param {Number} dy 高さ
	 * @param {Boolean} [fill = true] 埋めるか
	 */
	rect(x,y,dx,dy, fill=true){
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
	clear(x,y,dx,dy){
		const nowColor = this.context().fillStyle;
		this.color(bgColor).rect(x,y,dx,dy).color(nowColor);
		return this;
	};

	/**
	 * @description Canvas内をすべて消す
	 */
	clearAll(){ this.clear(0,0, this.size().width, this.size().height); return this; };

	/**
	 * @description テキストを描画
	 * @param {Number} x x座標
	 * @param {Number} y y座標
	 * @param {String} txt 描画する文字列
	 * @param {{style: String, align: String, baseline: String, dir:String}} font フォントの書式設定
	 * @param {Boolean} [fill = true] 埋めるか
	 */
	text(x,y,txt,font={},fill=true){
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
	circle(x,y,r,fill=true){
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
	image(x,y,dx,dy,url){
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
	split(dir,n,where,length,color="#bbb"){
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
	move(x,y){
		this.clear(this.x,this.y,this.dx,this.dy);
		this.rect(this.x+x, this.y+y, this.dx,this.dy);
		return this;
	}
}

class Music{

	/**
	 * @param {String} m 音楽ファイル名
	 */
	constructor(m){
		this.elem = new Audio();
		if(m){
			this.music = `/music/${m}.mp3`;
			this.elem.src = this.music;
		}
		this.elem.volume = 0.5;
		return this;
	}

	/**
	 * @description 音楽を再生
	 */
	play(){
		this.elem.play();
		return this;
	}

	/**
	 * @description 音楽を停止
	 */
	stop(){
		this.elem.pause();
		return this.reset();
	}


	/**
	 * @description 音楽を最初に戻す
	 */
	reset(){
		this.elem.currentTime = 0;
		return this;
	}

	/**
	 * @description 音量調整
	 * @param {Number} v 音量(%)
	 */
	setVolume(v){
		this.elem.volume = Number(v)/100;
		return this;
	}

	/**
	 * @description 音量取得
	 * @returns {Number}
	 */
	getVolume(){ return (this.elem.volume)*100; }

	/**
	 * @description フェードイン
	 * @param {Number} [t=500] ミリ秒数
	 * @param {Number} [v=50] ボリューム
	 */
	async fadeIn(t = 500, v=50){
		const th = this;
		this.play();
		this.setVolume(0);
		let _ = setInterval(function(){
			th.setVolume((th.getVolume())+1);
		},t/v);
		await sleep(t);
		clearInterval(_);
	}

	/**
	 * @description フェードアウト
	 * @param {Number} [t=500] ミリ秒数
	 */
	async fadeOut(t = 500){
		const th = this;
		const v = this.getVolume();
		let _ = setInterval(function(){
			const vol = (th.getVolume())-1;
			th.setVolume(vol<0?vol+1:vol);
		},t/v);
		await sleep(t);
		clearInterval(_);
		this.stop();
	}
}

export {Canvas, Block, Music}