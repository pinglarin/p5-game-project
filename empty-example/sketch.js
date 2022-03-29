let coins;
let player;
let score = 0;
let HP = 1;
let isDash = false;
let bg;
function setup() {
  bg = loadImage('BackgroundSprites.jpg');
  createCanvas(600, 600);
  coins = new Group();
  for (let i = 0; i < 10; i++) {
    let c = createSprite(
      random(100, width-100),
      random(100, height-100),10, 10);
    c.shapeColor = color(0, 255, 0);
    coins.add(c);    
  }

  //Player Config
  player = createSprite(50, 50, 20, 20);
  player.shapeColor = color(72,221,255);

  speed = createVector(5,5);

}
function draw() {
  background(bg);

  //Control by Mouse
  // player.velocity.x =   (mouseX-player.position.x)*0.1;
  // player.velocity.y =   (mouseY-player.position.y)*0.1;

  //Control by Keybord
  if (keyIsDown(87)) //w
  {
    player.position.y -= speed.y;
  }
  else if (keyIsDown(65))//a
  {
    player.position.x -= speed.x;
  } 
  else if (keyIsDown(83))//s
  {
    player.position.y += speed.y;
  }   
  else if (keyIsDown(68))//d
  {
    player.position.x += speed.x;
  }  
  
  if(keyIsDown(32) && isDash == false)//Spacebar
  {
    speed.set(15,15);
    isDash = true;
  }
  if(!keyIsDown(32))
  {
    speed.set(5,5);
    isDash = false;
  }  

  //Wall on mapsize
  if( player.position.x > width - 10)
  {
    player.position.x = width-10;
  }
  if( player.position.x <= 10 )
  {
    player.position.x = 10;
  }  
  if( player.position.y > height-10)
  {
    player.position.y = height-10;
  }
  if( player.position.y <= 10)
  {
    player.position.y = 10;
  }  
  
  player.overlap(coins, getCoin);
  drawSprites();
  fill(255);
  noStroke();
  textSize(20);
  textAlign(CENTER, CENTER);

  if (HP >= 0) {
    text("Score: " + score, 50, 570);
  }
  if (HP <= 0){
    textSize(75);
    text("Game over", width/2, height/2);
  }
}
function getCoin(player, coin) {
  coin.remove();
  score += 1;
}