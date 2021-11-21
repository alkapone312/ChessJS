class Field
{
	constructor(row,col,size, index, piece=null)
	{
		this.x = col*size;
		this.y = row*size;
		this.row = row;
		this.col = col;
		this.size = size;
		this.index = index;
		this.piece = piece;
		if(Math.pow(-1,this.row+this.col) == 1)
			this.color = color1;
		else
			this.color = color2;
	}

	drawField(color = null)
	{
		ctx.fillStyle = this.color;

		if(color)
			ctx.fillStyle = color;

		ctx.fillRect(this.x, this.y, this.size, this.size);

		if(this.piece)
			ctx.drawImage(this.piece.img, this.x , this.y);
	}

	mouseOver(mouse)
	{
		if((this.x<mouse.x && this.x+this.size>mouse.x) &&
		   (this.y<mouse.y && this.y+this.size>mouse.y))
		{
			return true;
		}
		return false;
	}
}