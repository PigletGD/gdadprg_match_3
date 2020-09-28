class TimerEntity extends cc.Node
{
	constructor(name = "TimerEntity", startTime = 120)
	{
		super();
		this.setName(name);
		this.scheduleUpdate();
		this._startingTime = startTime;
	}

	onEnter()
	{
		super.onEnter();
		console.log("Timer initialized");
		this._countdownComponent = new CountdownComponent(this._startingTime);
		this.addComponent(this._countdownComponent);
	}

	update(timestep)
	{
		super.update(timestep);

		//console.log(this.getName() + " " + this.remainingSeconds);
	}

	startCountdown()
	{
		this._countdownComponent.start();
	}

	pauseCountdown()
	{
		this._countdownComponent.pause();
	}

	resumeCountdown()
	{
		this._countdownComponent.resume();
	}

	stopCountdown()
	{
		this._countdownComponent.stop();
	}

	resetCountdown()
	{
		this._countdownComponent.reset();
	}

	setStartingTime(startTime = 120.0)
	{
		this._startingTime = startTime;
		this._countdownComponent = new CountdownComponent(startTime);
	}

	get remainingSeconds()
	{
		return this._countdownComponent.remainingSeconds;
	}

	get startTime()
	{
		return this._startingTime;
	}

}