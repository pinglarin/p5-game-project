var speed;
const Move = true;
var isDash = false;
let x, y;


function setup() {
  createCanvas(600, 600);
  noStroke();//borderless
  x = width / 2;  //player start position
  y = height / 2; //player start position
  speed = createVector(10,10);
  frameRate(60);
}

function draw() {
  background(16, 55, 84); 
  fill(51, 171, 177);
  ellipse(x, y, 50, 50); // x pos, y pos , size x , size y
  

  if(Move)
  {
    if (keyIsDown(87)) //w
    {
      y -= speed.y;
    }
    else if (keyIsDown(65))//a
    {
      x -= speed.x;
    } else if (keyIsDown(83))//s
    {
      y += speed.y;
    } else if (keyIsDown(68))//d
    {
      x += speed.x;
    }    
  }

  if( x > width - 25)
  {
    x = width - 25;
  }
  if( x <= 25 )
  {
    x = 25;
  }  
  if( y > height- 25)
  {
    y = height - 25;
  }
  if( y <= 25 )
  {
    y = 25;
  }  
}

function keyPressed()
{  
  if(keyIsDown(32) && isDash == false)
  {
    speed.set(20,20);
    isDash = true;
    print("Is Dash")
  }  
  else if (!keyIsDown(32) && isDash == true)
  {
    speed.set(10,10);
    isDash = false;
    
  }
 
}
