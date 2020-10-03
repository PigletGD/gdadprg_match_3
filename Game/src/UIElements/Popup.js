class Popup extends ccui.RelativeBox
{
	constructor(name)
	{
		super();
		this.setName(name);

		this.setAnchorPoint(cc.p(0.5, 0.5));
		this.setPositionType(ccui.Widget.POSITION_PERCENT);
		this.setPositionPercent(cc.p(0.5, 0.5));
		this.setSizeType(ccui.Widget.SIZE_PERCENT);
		this.setSizePercent(cc.p(0.7, 0.7));

		this.setBackGroundImageScale9Enabled(true);
		this.setBackGroundImage(res.Button9Slice_png, ccui.Widget.LOCAL_TEXTURE);
		let insetSize = 20;
		this.setBackGroundImageCapInsets(cc.rect(insetSize, insetSize, insetSize, insetSize));
	}

	addUIElement(uiElement)
	{
		this.addChild(uiElement);
	}

	playEntranceAnimation()
	{
		this.setScale(0.0);
		let scaleTo = new cc.ScaleTo(0.2, 1.0);
		scaleTo = new cc.EaseBackOut(scaleTo);
		this.runAction(scaleTo);
	}

	playExitAnimation(origin, exitFunction)
	{
		let scaleTo = new cc.ScaleTo(0.2, 0.0);
		let callFunc = new cc.callFunc(exitFunction, origin);
		scaleTo = new cc.EaseBackIn(scaleTo);
		this.runAction(new cc.sequence(scaleTo, callFunc));
	}
}