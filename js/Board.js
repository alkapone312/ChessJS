class Pieces
{
	constructor(img)
	{
		this.pieces = img;
	}

	givePieceAtIndex(index)
	{
		let sizeX = this.pieces.width/6;
		let sizeY = this.pieces.height/2;
		let x = sizeX*(index%6);
		let y = sizeY*(parseInt(index/6));

		let res = document.createElement("canvas");
		let resCtx = res.getContext("2d");
		res.width = cellSize;
		res.height = cellSize;

		resCtx.drawImage(this.pieces, -x, -y);

		return res;
	}
}


class Board
{
	constructor()
	{
		this.grid = [];
		this.figures = [];
		let color = true;
		let side = true;
		this.figures[0] = new King  (color, side);
		this.figures[1] = new Queen (color, side);
		this.figures[2] = new Bishop(color, side);
		this.figures[3] = new Knight(color, side);
		this.figures[4] = new Rook  (color, side);
		this.figures[5] = new Pawn  (color, side);
		this.figures[6] = new King  (!color, !side);
		this.figures[7] = new Queen (!color, !side);
		this.figures[8] = new Bishop(!color, !side);
		this.figures[9] = new Knight(!color, !side);
		this.figures[10]= new Rook  (!color, !side);
		this.figures[11]= new Pawn  (!color, !side);
		this.mouseOver = null;
	}

	decodeFigure(string)
	{
		let index = null;
		switch(string)
		{
			case 'k':
				index = 0; break;
			case 'q':
				index = 1; break;
			case 'b':
				index = 2; break;
			case 'n':
				index = 3; break;
			case 'r':
				index = 4; break;
			case 'p':
				index = 5; break;
			case 'K':
				index = 6; break;
			case 'Q':
				index = 7; break;
			case 'B':
				index = 8; break;
			case 'N':
				index = 9; break;
			case 'R':
				index = 10; break;
			case 'P':
				index = 11; break;
		}
		return index
	}

	decodeFen(string)
	{
		string = string.replaceAll("/", "");
		let field = 0;
		for(let i = 0 ; i < string.length; i++)
		{
			if(isNaN(string[i]) && string[i]!=undefined)
			{
				let index = this.decodeFigure(string[i]);
				
				let col = field%8;
				let row = parseInt(field/8);
				this.grid[field] = new Field(row, col, cellSize, field, this.figures[index]);
				this.grid[field].drawField();
				field++;
			}
			else
			{
				let n = parseInt(string[i]);
				while(n>0)
				{
					let col = field%8;
					let row = parseInt(field/8);
					this.grid[field] = new Field(row, col, cellSize, field);
					this.grid[field].drawField();
					field++;
					n--;
				}
			}
		}
	}

	codeFen()
	{
		let string = '';
		let blank = 0;
		for(let i = 0 ; i < this.grid.length; i++)
		{
			if(i%8 == 0 && i)
			{
				if(blank)
					string+=blank;
				string+="/";
				blank = 0;
			}
			if(this.grid[i].piece)
			{
				if(blank)
				{
					string+=blank;
					blank = 0;
				}
				string += this.grid[i].piece.fen
			}
			else
			{
				blank++;
			}

			if(blank && i == this.grid.length-1)
			{
				string+=blank;
			}
		}

		return string;
	}

	mouseOverField(mouse)
	{
		for(let i=0 ; i < this.grid.length ; i++)
		{
			let field = this.grid[i];
			if(field.mouseOver(mouse))
			{
				this.mouseOver = field.index;
			}
		}
	}

	redraw()
	{
		for(let i=0 ; i < this.grid.length ; i++)
		{
			let field = this.grid[i];
			field.drawField();
		}
	}
}