let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
canvas.height = width;
let color1 = "#DDD";
let color2 = "#A55";

let cellSize = width/8;

let piecesImg = document.querySelector("img");
let moveAudio = document.querySelector("audio");

let mouse = {
	x:0,
	y:0,
	down: false
}

ctx.fill();

var board = null;
let pieces = null;