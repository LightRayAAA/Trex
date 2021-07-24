var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var obstacle, obstacleGroup, obstacleImage

var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6

var newImage;

var gameOver, restart, gameOverImg, restartImg

var gamestate = "Play"

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")
  cloudImage = loadImage("cloud.png");
 obstacle1 = loadImage("obstacle1.png");
 obstacle2 = loadImage("obstacle2.png");
 obstacle3 = loadImage("obstacle3.png");
 obstacle4 = loadImage("obstacle4.png");
 obstacle5 = loadImage("obstacle5.png");
 obstacle6 = loadImage("obstacle6.png");
}


function setup() {
  createCanvas(600, 200);
  cloudsGroup = new Group();
  obstacleGroup = new Group();
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,100)
  gameOver.addImage("gameoverImg", gameOverImg)
  restart = createSprite(300,150)
  restart.addImage("restartImg", restartImg)
}

function draw() {
  background(180);
  if(gamestate == "Play"){
  gameOver.visible = false
  restart.visible = false

    if(keyDown("space") && trex.y>=100) {
      trex.velocityY = -10;
    }

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    spawnClouds();
  spawnObstacles();

  if(obstacleGroup.isTouching(trex)){
  gamestate = "End"
  }
  }


  if(gamestate == "End"){
  ground.velocityX = 0
  trex.velocityY = 0
  trex.changeAnimation("collided")
  obstacleGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
  gameOver.visible = true
  restart.visible = true
  }
  
  if(mousePressedOver(restart)){
  reset();
  }
  
  trex.velocityY = trex.velocityY + 0.8
  

  
  trex.collide(invisibleGround);
  
  //spawn the clouds
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloudsGroup.add(cloud)
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
}
function spawnObstacles(){
  if(frameCount % 80 === 0){
  obstacle = createSprite(600,160,10,40);
  //obstacle.scale = 0.4;
  obstacle.velocityX = -3;
  obstacleGroup.add(obstacle)
  var randnum = Math.round(random(1,6))
  switch(randnum)
  {
  case 1:
  obstacle.addImage("obstacle1", obstacle1)
  obstacle.scale = 0.8
  break;
  
  case 2:
  obstacle.addImage("obstacle2", obstacle2)
  break;
  
  case 3:
  obstacle.addImage("obstacle3", obstacle3)
  break;
  
  case 4:
  obstacle.addImage("obstacle4", obstacle4)
  obstacle.scale = 0.7
  break;

  case 5:
  obstacle.addImage("obstacle5", obstacle5)
  break; 

  case 6:
  obstacle.addImage("obstacle6", obstacle6)
  break;

  }
  }
}

function reset(){
gamestate = "play"
score = 0
trex.addAnimation("running", trex_running)
//obstacleGroup.setVelocityXEach(0)
//cloudsGroup.setVelocityXEach(0)
obstacleGroup.destroyEach()
cloudsGroup.destroyEach()
}