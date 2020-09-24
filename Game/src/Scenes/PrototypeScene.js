class PrototypeScene extends cc.Scene
{
	constructor()
	{
		super();
	}

	onEnter()
	{
		super.onEnter();

		let prototypeLayer = new PrototypeLayer(cc.size(550, 550), cc.color("#2255dd"));

		// TODO: Refactor into LayerResizer that can be anchored in a particular location
		prototypeLayer.x = cc.winSize.width / 2 - prototypeLayer.width / 2;
		prototypeLayer.y = cc.winSize.height / 2 - prototypeLayer.height / 2;

		this.addChild(prototypeLayer);
	}
}