function start()
{
	pieces = new Pieces(piecesImg);
	board = new Board();

	window.board.decodeFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
	mouseCheck();
}

function mouseCheck()
{
	requestAnimationFrame(mouseCheck);
	window.board.mouseOverField(mouse);
}

piecesImg.addEventListener("load", start);

let from = null;

let draggingImg = document.createElement("canvas");
document.body.appendChild(draggingImg);
draggingImg.width=cellSize;
draggingImg.height=cellSize;
draggingImg.style.left = "-100px";
draggingImg.style.top = "-100px";
draggingImg.style.position = "absolute";
draggingImg.style.backgroundColor = "rgba(0,0,0,0)";


document.addEventListener("mousemove", (e)=>{
	mouse.x = e.clientX-canvas.offsetLeft;
	mouse.y = e.clientY-canvas.offsetTop;
	if(mouse.down && from != null)
	{
		draggingImg.style.left = e.clientX-cellSize/2 + "px";
		draggingImg.style.top = e.clientY-cellSize/2 + "px";
	}
});


canvas.addEventListener("mousedown", (e)=>{
	mouse.down = true;
	console.log(board.mouseOver)
	if(board.mouseOver != null)
		if(board.grid[board.mouseOver].piece != null)
		{
			from = board.mouseOver;
			draggingImg.getContext('2d').drawImage(board.grid[from].piece.img, 0, 0);
			board.grid[from].piece.checkValidMoves(board.grid,from);
			let validMoves = board.grid[from].piece.validMoves;
			console.log(validMoves);
			for(let i = 0 ; i < validMoves.length ; i++)
			{
				board.grid[validMoves[i]].drawField("rgba(50,255,50,0.3)");
			}
		}
});

document.addEventListener("mouseup", (e)=>{
	mouse.down = false;
	draggingImg.style.left = "-100px";
	draggingImg.style.top = "-100px";
	draggingImg.getContext('2d').clearRect(0,0,cellSize,cellSize)
	if(from != null)
		if(board.grid[from].piece.isMoveValid(board.grid, from, board.mouseOver))
		{
			moveAudio.play();
			board.grid[board.mouseOver].piece = board.grid[from].piece;
			board.grid[from].piece = null;
			board.grid[board.mouseOver].figureIndex = board.grid[from].figureIndex;
			board.grid[from].figureIndex = null;
			console.log(board.codeFen());
		}
	board.redraw();
	from = null;
});

start();