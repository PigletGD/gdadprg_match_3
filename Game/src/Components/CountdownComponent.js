
//A component that is counts down from a value to zero.
// Time is in seconds.
class CountdownComponent extends cc.Component
{
	constructor(startingTime = 120.0)
	{
		super();
		this.setName("CountdownComponent");

		this._startingTime = startingTime;
		this._currentTime = startingTime;
		this._isCountingDown = false;
	}

	onEnter()
	{
		super.onEnter();
	}

	update(delta)
	{
		super.update(delta);
		if (!GameManager.getInstance().isPaused())
		{
			if (this._isCountingDown === true &&
				this._currentTime >= 0.0)
			{
				this._currentTime -= delta;
			}
			else
			{
				this._currentTime = 0.0;
			}
		}
	}

	start()
	{
		this._isCountingDown = true;
		this._currentTime = this._startingTime;
	}

	resume()
	{
		this._isCountingDown = true;
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
