class TimerEntity extends cc.DrawNode
{
	constructor()
	{
		super();
		this.scheduleUpdate();
	}

	onEnter()
	{
		super.onEnter();
		console.log("Timer initialized");

	}

	update(timestep)
	{
		super.update(timestep);
		console.log("Timer");
	}

}