class Text extends ccui.Text
{
	constructor(name,
		message,
		fontAsset,
		size,
		positionByPercent,
		outlineProp = {color: cc.color(0, 0, 0, 255), stroke: 0})
	{
		super(message, fontAsset, size);

		this.setName(name);
		this.setPositionType(ccui.Widget.POSITION_PERCENT);
		this.setPositionPercent(cc.p(positionByPercent.x, positionByPercent.y));
		this.enableOutline(outlineProp.color, outlineProp.stroke);

		this.addComponent(new FitToParent());
	}


}


class Text2 extends ccui.Text
{
	constructor(name)
	{
		super();
		this.setName(name);
		this.setPositionType(ccui.Widget.POSITION_PERCENT);
		this.addComponent(new FitToParent());
	}


}