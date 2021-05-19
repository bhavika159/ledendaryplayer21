var PLAY = 1;
var END = 0;
var gameState = PLAY;
//var myBackground = createSprite(200,200,400,400);
//myBackground.setAnimation("sci");
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("images/bg2.png");
  bgImg = loadImage("images/bg2.png");
  cloudImage = loadImage("images/life21.png");
  
  obstacle1 = loadImage("images/virus1.png");
  obstacle2 = loadImage("images/virus0.png");
  obstacle3 = loadImage("images/virus2.png");
  obstacle4 = loadImage("images/virus3.png");
  obstacle5 = loadImage("images/virus4.png");
  obstacle6 = loadImage("images/virus5.png");
  obstacle7= loadImage("images/virus6.png");
  obstacle8 = loadImage("images/virus7.png");
  obstacle9 = loadImage("images/virus8.png");
  obstacle10 = loadImage("images/virus9.png");
  obstacle11 = loadImage("images/virus10.png");
  obstacle12 = loadImage("images/virus11.png");

  gameOverImg = loadImage("images/game over159.png");
  restartImg = loadImage("restart.png");
}

function setup() { 
  createCanvas(displayWidth,250);
  
  trex = createSprite(80,180,20,50);
  trex.debug=true;
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(300,180,400,20);
 // ground.addImage("ground",groundImage);
 // ground.x = ground.width /2;
  ground.velocityX = -6;
  ground.visible = false;

  gameOver = createSprite(800,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(800,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(bgImg);
  textSize(25);
  fill(rgb(random(0,255),random(0,255),random(0,255)));
  text("Score: "+ score, 900,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/70);
    console.log("testing"+ score);
    console.log("checking frame" + getFrameRate())
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && trex.y >= 140) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = 200;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 70 === 0) {
    var cloud = createSprite(displayWidth,90,40,10);
    cloud.y = Math.round(random(90,165));
    cloud.addImage(cloudImage);
    cloud.velocityX = -6;
    
     //assign lifetime to the variable
     cloud.scale = 0.1;
     cloud.lifetime = 700;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60=== 0) {
    var obstacle = createSprite(displayWidth,165,10,40);
    obstacle.debug = true;
    obstacle.velocityX = -6;
    
    obstacle.y = Math.round(random(70,200))
    //generate random obstacles
    var rand = Math.round(random(1,12));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      case 7: obstacle.addImage(obstacle7);
              break; 
      case 8: obstacle.addImage(obstacle8);
              break; 
      case 9: obstacle.addImage(obstacle9);
              break;    
      case 10: obstacle.addImage(obstacle10);
              break;       
      case 11: obstacle.addImage(obstacle11);
              break;
      case 12: obstacle.addImage(obstacle12);
              break;     
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}