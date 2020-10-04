class ResizeListener extends cc.Component
{
    constructor()
    {
        super();
        // if(new.target === ResizeListener)
        //     throw new TypeError("Cannot construct Abstract instances directly");
        this.isResizeContent = true; // Changed to true to resize once in scene, avoiding weird layouts
    }

    onEnter()
    {
        super.onEnter();
        this.listener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: 'canvas-resize',
            callback: this.onCanvasResize.bind(this)
        });
        cc.eventManager.addListener(this.listener, this.getOwner());
        // this.isResizeContent = true; // Changed to true to resize once in scene, avoiding weird layouts
    }

    onCanvasResize()
    {
        this.isResizeContent = true;
    }

    onResize()
    {

    }

    update(dt)
    {
        if (this.isResizeContent)
        {
            this.onResize();
            this.isResizeContent = false;
        }
    }
}