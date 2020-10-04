class FitToParent extends ResizeListener
{
    constructor()
    {
        super();
        this.setName("Fit To Parent");
    }

    onEnter()
    {
        super.onEnter();
    }

    onResize()
    {
        if (this.isResizeContent)
        {
            let owner = this.getOwner();

            let ownerSize = owner.getContentSize();
            let parentSize = owner.getParent().getContentSize();

            let scaleX = parentSize.width / ownerSize.width;
            let scaleY = parentSize.height / ownerSize.height;

            let targetScale = 1;
            if (scaleX < scaleY)
            {
                targetScale = scaleX;
            }
            else
            {
                targetScale = scaleY;
            }

            if (targetScale > 1)
            {
                targetScale = 1;
            }
            owner.setScale(targetScale);
            this.isResizeContent = false;
        }
    }
}