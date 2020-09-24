
// Time is in seconds
class CountdownComponent extends cc.Component
{
	constructor(startingTime = 180.0)
	{
		super();
		this._startingTime = startingTime;
		this._currentTime = startingTime;
		this.setName("CountdownComponent");
		this._isCountingDown = false;
	}

	onEnter()
	{
		super.onEnter();
	}

	update(delta)
	{
		super.update(delta);
		if (this._isCountingDown === true &&
			this._currentTime > 0.0)
		{
			this._currentTime -= delta;
		}
	}

	start()
	{
		this._isCountingDown = true;
		this._currentTime = this._startingTime;
	}

	pause()
	{
		this._isCountingDown = false;
	}

	stop()
	{
		this._isCountingDown = false;
		this._currentTime = 0.0;
	}

	reset()
	{
		this._currentTime = this._startingTime;
	}

	get remainingSeconds()
	{
		return this._currentTime;
	}


}