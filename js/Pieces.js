class Piece
{
	constructor(color, side)
	{
		this.validMoves = [];
		this.color = color;
		this.side = side;
	}

	isMoveValid(grid, from, to)
	{
		if(from == to)
			return false;
		
		if(grid[to].piece)
			if(grid[to].piece.color == this.color)
				return false;

		if(!this.validMoves.includes(to))
			return false;

		return true;
	}

	//if pieces on way are this.color delete them
	sanitizeMoves(grid)
	{
		let toDelete = []
		for(let i = 0 ; i < this.validMoves.length; i++)
		{
			if(grid[this.validMoves[i]].piece && grid[this.validMoves[i]].piece.color == this.color)
				toDelete.push(this.validMoves[i]);
		}

		this.validMoves = this.validMoves.filter(item => !toDelete.includes(item));
	}


	checkValidMoves(from)
	{

	}
}

class King extends Piece
{
	constructor(b,s)
	{
		super(b, s);
		if(this.color)
		{
			this.fen = "k";
			this.index = 0;
		}
		else
		{
			this.fen = "K";
			this.index = 6;
		}
		this.img = pieces.givePieceAtIndex(this.index);
	}

	checkValidMoves(grid, from)
	{
		this.validMoves = [];
		let col = from%8;
		let moves = [-9,-8,-7,-1,1,7,8,9];
		for(let i = 0 ; i < moves.length ; i++)
		{
			if(Math.abs((from+moves[i])%8 - col) <= 1 && from+moves[i] < 64 && from+moves[i] >= 0)
			{
				this.validMoves.push(from+moves[i]);
			}
		}
		this.sanitizeMoves(grid);
	}
}

class Queen extends Piece
{
	constructor(b,s)
	{
		super(b, s);
		if(this.color)
		{
			this.fen = "q";
			this.index = 1;
		}
		else
		{
			this.fen = "Q";
			this.index = 7;
		}
		this.img = pieces.givePieceAtIndex(this.index);
	}

	checkValidMoves(grid, from)
	{
		this.validMoves = [];
		let col = from%8;
		let row = parseInt(from/8);
		let go = [true,true,true,true,true,true,true,true];
		for(let i = 1 ; i < 8 ; i++)
		{
			//on sides

			//right
			if(col+i<8 && go[0])
			{
				if(grid[from+i].piece)
					go[0] = false;
				this.validMoves.push(from+i);
			}

			//left
			if(col-i>=0 && go[1])
			{
				if(grid[from-i].piece)
					go[1] = false;
				this.validMoves.push(from-i);
			}

			//bottom
			if(row+i<8 && go[2])
			{
				if(grid[from+8*i].piece)
					go[2] = false;
				this.validMoves.push(from+8*i);
			}

			//top
			if(row-i>=0 && go[3])
			{
				if(grid[from-8*i].piece)
					go[3] = false;
				this.validMoves.push(from-8*i);
			}

			//on cross

			//down left
			if(col+i<8 && row+i<8 && go[4])
			{
				if(grid[from+i+8*i].piece)
					go[4] = false;
				this.validMoves.push(from+i+8*i);
			}

			//down right
			if(col-i>=0 && row+i<8 && go[5])
			{
				if(grid[from-i+8*i].piece)
					go[5] = false;
				this.validMoves.push(from-i+8*i);
			}

			//up left
			if(col+i<8 && row-i>=0 && go[6])
			{
				if(grid[from+i-8*i].piece)
					go[6] = false;
				this.validMoves.push(from+i-8*i);
			}

			//up right
			if(col-i>=0 && row-i>=0 && go[7])
			{
				if(grid[from-i-8*i].piece)
					go[7] = false;
				this.validMoves.push(from-i-8*i);
			}
		}
		this.sanitizeMoves(grid);
	}
}

class Bishop extends Piece
{
	constructor(b,s)
	{
		super(b, s);
		if(this.color)
		{
			this.fen = "b";
			this.index = 2;
		}
		else
		{
			this.fen = "B";
			this.index = 8;
		}
		this.img = pieces.givePieceAtIndex(this.index);
	}

	checkValidMoves(grid, from)
	{
		this.validMoves = [];
		let col = from%8;
		let row = parseInt(from/8);
		let go = [true,true,true,true];
		for(let i = 1 ; i < 8 ; i++)
		{
			//down left
			if(col+i<8 && row+i<8 && go[0])
			{
				if(grid[from+i+8*i].piece)
					go[0] = false;
				this.validMoves.push(from+i+8*i);
			}

			//down right
			if(col-i>=0 && row+i<8 && go[1])
			{
				if(grid[from-i+8*i].piece)
					go[1] = false;
				this.validMoves.push(from-i+8*i);
			}

			//up left
			if(col+i<8 && row-i>=0 && go[2])
			{
				if(grid[from+i-8*i].piece)
					go[2] = false;
				this.validMoves.push(from+i-8*i);
			}

			//up right
			if(col-i>=0 && row-i>=0 && go[3])
			{
				if(grid[from-i-8*i].piece)
					go[3] = false;
				this.validMoves.push(from-i-8*i);
			}
		}
		this.sanitizeMoves(grid);
	}
}

class Knight extends Piece
{
	constructor(b,s)
	{
		super(b, s);
		if(this.color)
		{
			this.fen = "n";
			this.index = 3;
		}
		else
		{
			this.fen = "N";
			this.index = 9;
		}
		this.img = pieces.givePieceAtIndex(this.index);
	}

	checkValidMoves(grid, from)
	{
		this.validMoves = [];
		let col = from%8;
		let moves = [10,6,15,17,-10,-6,-15,-17];

		for(let i = 0 ; i < moves.length ; i++)
		{
			if(Math.abs((from+moves[i])%8 - col) <= 2 && from+moves[i] < 64 && from+moves[i] >= 0)
			{
				this.validMoves.push(from+moves[i]);
			}
		}
		this.sanitizeMoves(grid);
	}
}

class Rook extends Piece
{
	constructor(b,s)
	{
		super(b, s);
		if(this.color)
		{
			this.fen = "r";
			this.index = 4;
		}
		else
		{
			this.fen = "R";
			this.index = 10;
		}
		this.img = pieces.givePieceAtIndex(this.index);
	}

	checkValidMoves(grid, from)
	{
		this.validMoves = [];
		let col = from%8;
		let row = parseInt(from/8);
		let go = [true,true,true,true];
		for(let i = 1 ; i < 8 ; i++)
		{
			//on sides

			//right
			if(col+i<8 && go[0])
			{
				if(grid[from+i].piece)
					go[0] = false;
				this.validMoves.push(from+i);
			}

			//left
			if(col-i>=0 && go[1])
			{
				if(grid[from-i].piece)
					go[1] = false;
				this.validMoves.push(from-i);
			}

			//bottom
			if(row+i<8 && go[2])
			{
				if(grid[from+8*i].piece)
					go[2] = false;
				this.validMoves.push(from+8*i);
			}

			//top
			if(row-i>=0 && go[3])
			{
				if(grid[from-8*i].piece)
					go[3] = false;
				this.validMoves.push(from-8*i);
			}
		}
		this.sanitizeMoves(grid);
	}
}

class Pawn extends Piece
{
	constructor(b,s)
	{
		super(b, s);
		if(this.color)
		{
			this.fen = "p";
			this.index = 5;
		}
		else
		{
			this.fen = "P";
			this.index = 11;
		}
		this.img = pieces.givePieceAtIndex(this.index);
	}

	checkValidMoves(grid, from)
	{
		this.validMoves = [];
		
		if(this.side)
		{
			if(grid[from+8].piece == null)
				this.validMoves.push(from+8);
			if(grid[from+7].piece != null)
				this.validMoves.push(from+7);
			if(grid[from+9].piece != null)
				this.validMoves.push(from+9);
		}
		else
		{
			if(grid[from-8].piece == null )
				this.validMoves.push(from-8);
			if(grid[from-7].piece != null)
				this.validMoves.push(from-7);
			if(grid[from-9].piece != null)
				this.validMoves.push(from-9);
		}

		let toDelete = [];
		for(let i = 0 ; i < this.validMoves.length; i++)
		{
			if(Math.abs(this.validMoves[i]%8 - from%8) > 2)
				toDelete.push(this.validMoves[i])
		}
		this.validMoves = this.validMoves.filter(item => !toDelete.includes(item))

		this.sanitizeMoves(grid);
	}
}