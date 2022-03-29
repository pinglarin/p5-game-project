// Thank you Unlucky Studio for free sprites!
// https://opengameart.org/content/complete-spaceship-game-art-pack

let coins;
let player;
let score = 0;
let HP = 1;
let isDash = false;
let bg;
let gameover = 0;

let timer = 0;
let startCoin = 10;

function preload() {
  coin_anim = loadAnimation("graphics/items/1.png", "graphics/items/2.png",);
  player_anim = loadAnimation("graphics/ship/1.png", 
                              "graphics/ship/2.png",
                              "graphics/ship/3.png",
                              "graphics/ship/4.png",
                              "graphics/ship/5.png",
                              "graphics/ship/6.png",
                              "graphics/ship/7.png",
                              "graphics/ship/8.png");
  enemy_anim = loadAnimation("graphics/aestroid_dark.png");

                      
  
}

function setup() {
  bg = loadImage('background.jpg');
  createCanvas(600, 600);
  coins = new Group();
  enemies = new Group();
  for (let i = 0; i < startCoin; i++) {
    let c = createSprite(
      random(100, width-100),
      random(100, height-100),10, 10);
    c.addAnimation("default", coin_anim);
    coins.add(c);    
  }

  //Player Config
  player = createSprite(50, 550, 20, 20);
  player.addAnimation("default", player_anim);
  player.rotateToDirection=true;
  // player.shapeColor = color(72,221,255);

  enemy = createSprite(600, 600, 50, 50);
  // enemy.shapeColor = color(72,221,255);

  speed = createVector(5,5);

}
function draw() {
  background(bg);

  //Control by Mouse
  // player.velocity.x =   (mouseX-player.position.x)*0.1;
  // player.velocity.y =   (mouseY-player.position.y)*0.1;

  if (!gameover) {
    keyWASD();
    enemyBehavior();
  }

  if (startCoin - score <= 1) {
    let c = createSprite(
      random(100, width-100),
      random(100, height-100),10, 10);
    c.addAnimation("default", coin_anim);
    coins.add(c);  
    startCoin += 1;
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
  player.overlap(enemy, hurt);
  drawSprites();
  fill(255);
  noStroke();
  textSize(20);
  textAlign(CENTER, CENTER);

  if (HP >= 0) {
    text("Score: " + score, 50, 570);
    text("HP: " + HP, 150, 570);
  }
  if (HP <= 0){
    textSize(75);
    text("Game over", width/2, height/2);
    textSize(25);
    text("Score: " + score, width/2, height/2 + 50);
    gameover = 1;
  }

}
function getCoin(player, coin) {
  coin.remove();
  score += 1;
}

function hurt(player, enemy) {
  HP -= 1;
}

function  enemyBehavior() {
  if (millis() >= 1500+timer || enemy.position.y >= 700) {
    size = random(50, 100);
    enemy = createSprite(random(0, 600), 0, 20, 20);
    enemy.addAnimation("default", enemy_anim);
    // enemy.shapeColor = color(0,0,0);
    timer = millis();
    enemies.add(enemy);
  }  
  enemy.position.y += 8;
  enemy.rotation += 2;
}

function keyWASD(){
    //Control by Keybord
    if (keyIsDown(87)) //w
    {
      player.position.y -= speed.y;
      player.rotation = 0;
    }
    else if (keyIsDown(65))//a
    {
      player.position.x -= speed.x;
      player.rotation = 270;
    } 
    else if (keyIsDown(83))//s
    {
      player.position.y += speed.y;
      player.rotation = 180;
    }   
    else if (keyIsDown(68))//d
    {
      player.position.x += speed.x;
      player.rotation = 90;
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
}