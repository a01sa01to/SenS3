import {Music} from "./class";

const list = [{
	"name": "Test",
	"path": "rondo-of-arctic-night",
},{
	"name": "Test2",
	"path": "cielo"
}];

const musicList = [];
list.forEach(e=>{
	musicList.push(new Music(e.path));
});

/**
 * @description 名前からファイルパスを返す
 * @param {String} n 曲の名前
 * @returns {String} Path
 */
const name2path = n=>list.find(e=>e.name===n).path;

/**
 * @description ファイルパスから名前を返す
 * @param {String} n ファイルパス
 * @returns {String} 曲の名前
 */
const path2name = p=>list.find(e=>e.path===p).name;

/**
 * @description 名前からリストインデックスをとる
 * @param {String} n 曲の名前
 * @returns {Number} Index
 */
const name2index = n=>list.findIndex(e=>e.name===n);

/**
 * @description 名前から曲クラスを返す
 * @param {String} n 曲の名前
 * @returns {Music} Music
 */
const name2music = n=> (musicList[name2index(n)] || new Music(""));

export {list, name2path, path2name, name2index, name2music};