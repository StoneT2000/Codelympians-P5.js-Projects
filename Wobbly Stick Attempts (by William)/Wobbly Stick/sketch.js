var allSegments = [];
var maxRange = 0;
var maxRangeNumber = 200;
var spacing = 0;
var screenMiddleX = 0;
var angle = 0;
var acceleration = 0;

function segment()
{
    this.setup = function(rangeNumber)
    {
        this.rangeNumber = rangeNumber;
        this.space = spacing;
        this.xPrevious = screenMiddleX;
        this.yPrevious = windowHeight;
        this.x = screenMiddleX;
        this.y = (windowHeight + 100) - this.rangeNumber * this.space;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.acceleration = acceleration;
        
        
    }
    this.update = function(Xmouse, Ymouse)
    {
        if (this.rangeNumber != 0)
        {

            angle = Math.atan2(windowHeight - Ymouse, screenMiddleX - Xmouse);
            this.xTarget = screenMiddleX - (this.space * this.rangeNumber * Math.cos(angle));
            this.yTarget = windowHeight - (this.space * this.rangeNumber * Math.sin(angle));
            this.xTargetDiff = Math.abs(this.xTarget - this.x);
            this.yTargetDiff = Math.abs(this.yTarget - this.y);

            this.x += this.xSpeed;
            if (this.x < this.xTarget)//if it is to the left of the target
            {
                this.xSpeed += this.xTargetDiff * Math.abs(Math.cos(angle)) / 100;
            }
            else if (this.x > this.xTarget)//if it is to the right of its target
            {
                this.xSpeed -= this.xTargetDiff * Math.abs(Math.cos(angle)) / 100;
            }
            this.y += this.ySpeed;
            if (this.y < this.yTarget)//if below target
            {
                this.ySpeed += this.yTargetDiff / 100;
            }
            else if (this.y > this.ySpeed)//if above target
            {
                this.ySpeed -= this.yTargetDiff / 100;
            }
            if ((this.x <= 0 && this.xSpeed < 0) | (this.x >= windowWidth && this.xSpeed > 0))
            {
                this.xSpeed *= -1
            }
            if ((this.y <= 0 && this.ySpeed < 0) | (this.y >= windowHeight && this.ySpeed > 0))
            {
                this.ySpeed *= -1
            }
            //speed decay
            this.xSpeed *= .99;
            this.ySpeed *= .99;
        }
        strokeWeight(100)
        line(this.xPrevious, this.yPrevious, this.x, this.y)
    }
}

function setup()
{
    createCanvas(windowWidth, windowHeight);
    screenMiddleX = windowWidth / 2;
    maxRange = windowHeight * 2 / 3;
    spacing = maxRange / maxRangeNumber;
    acceleration = spacing / 5;
    for (i = 0; i < maxRangeNumber; i++)
    {
        var newSegment = new segment;
        newSegment.setup(i);
        allSegments.push(newSegment)
    }
}

function draw()
{
    background(100)
    for (i=0; i < allSegments.length; i++)
    {
        allSegments[i].update(mouseX, mouseY);
        if (i > 0)
        {
            allSegments[i].xPrevious = allSegments[i - 1].x;
            allSegments[i].yPrevious = allSegments[i - 1].y;
        }
    }
}