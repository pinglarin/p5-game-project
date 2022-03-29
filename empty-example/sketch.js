var speed;
const Move = true;
var isDash = false;
var DashDir = 0;
let x, y;
var song;

let player;
// function preload()
// {
//   song = loadSound('Cytus R - VitMaster - Sakuzyo.m4a');
// }


function setup() {
  createCanvas(600, 600);
  //song = loadSound("Cytus R - VitMaster - Sakuzyo.m4a");
  //song.play();
  noStroke();//borderless  
  x = width / 2;  //player start position
  y = height / 2; //player start position
  speed = createVector(10,10);
  frameRate(60);


}

function draw() {
  background(16, 55, 84); 
  if(!isDash)
  {
    fill(51, 171, 177);
    ellipse(x, y, 50, 50); // player size x pos, y pos , size x , size y
  }
  else if(isDash && DashDir == 1)
  {
    fill(255, 0, 0);
    ellipse(x, y, 25, 50); // player size x pos, y pos , size x , size y     
  }  
  else if(isDash && DashDir == 2)
  {
    fill(255, 0, 0);    
     ellipse(x, y, 50, 25); // player size x pos, y pos , size x , size y
  }    
 
  //Control System
  if (keyIsDown(87)) //w
  {
    y -= speed.y;
  }
  else if (keyIsDown(65))//a
  {
    x -= speed.x;
  } 
  else if (keyIsDown(83))//s
  {
    y += speed.y;
  }   
  else if (keyIsDown(68))//d
  {
    x += speed.x;
  }    
 
  //Wall on mapsize
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
  if(keyIsDown(32) && (keyIsDown(87) || keyIsDown(83)) && isDash == false)
  {  
   
    speed.set(20,20);
    isDash = true;
    print("Is Dash |");
    print(DashDir);
   
      DashDir = 1; //Horizon
    
 
  } 
  if(keyIsDown(32) && (keyIsDown(65) || keyIsDown(68)) && isDash == false)
  {    
    speed.set(20,20);
    isDash = true;
    print("Is Dash - ");
    print(DashDir);
    
      DashDir = 2; //Vertical
    
  } 
  if (!keyIsDown(32) && isDash == true)
  {
    speed.set(10,10);
    isDash = false; 
    DashDir = 0;  
  }
 
}
