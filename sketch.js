var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var score;
var cloudImage;
var ob1, ob2, ob3, ob4, ob5, ob6;
var s;
var og, cg;
var PLAY = 1; 
var END = 0;
var gameState = PLAY;
var go, goi, r, ri;
var jump, checkpoint, die;



function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png");  
  cloudImage = loadImage("cloud.png")
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
  goi = loadImage("gameOver.png")
  ri = loadImage("restart.png")
  checkpoint = loadSound("checkpoint.mp3")
  die = loadSound("die.mp3")
  jump = loadSound("jump.mp3")
  
}

function setup() {

  createCanvas(windowWidth, windowHeight)
  
  
  s = 0 

  //create a trex sprite
  trex = createSprite(50, height - 70, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(width/2, height - 75, width, 125);
  ground.addImage("ground", groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(4+3*s/100);
  
  //creating invisible ground
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

  //Create the obstacle group
  og = new Group()

  //Create the cloud group
  cg = new Group()

  //debug trex 
  trex.debug = true
  trex.setCollider("circle", 0, 0, 40, )
  //create game over
  go = createSprite(width/2, height/2 - 50,)
  go.addImage(goi)
  //creating restart 
  r = createSprite(width/2 , height/2)
  r.addImage(ri)
  //scaling game over
  go.scale = 0.5
  //scaling restart 
  r.scale = 0.5
}

function draw() {
  //set background color
  background(180);

  text("Score: " + s, 500,50)
  

  //Identifying game states 

  if (gameState === PLAY) {
    ground.velocityX = -4
    //score increment
    s = s + Math.round(getFrameRate()/60)
    //jumping condition
    if(touches.length > 0 || keyDown("space") && trex.collide(invisibleGround)) {
      trex.velocityY = -12;
      touches = []
      jump.play()
    }
    //ground increment
    if (ground.x < 0){
      ground.x = ground.width/2;
    }


    //moving dino
    trex.velocityY = trex.velocityY + 0.8
    //spawn clouds
    spawnClouds()
    //spawn obstacles 
    spawnObstacles()
    if (og.isTouching(trex)) {
      gameState = END
      //trex.velocityY = -10
      die.play()
     
  
    }

    go.visible = false 
    r.visible = false 
  } 
  
  else if (gameState === END) {
    ground.velocityX = 0 
    og.setVelocityXEach(0)
    cg.setVelocityXEach(0)
    trex.changeAnimation("collided", trex_collided)
    og.setLifetimeEach(-1)
    trex.velocityY = 0
    go.visible = true
    r.visible = true 
    if (mousePressedOver(r)) {
        reset()
    } 
  }


  //logging y coordinate of trex
  //console.log(frameCount)
  
  
  
  // jump when the space key is pressed
  
  
  
  
 
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds
  
  
  drawSprites(); 
}

//function to spawn the clouds
function spawnClouds(){
 // make clouds and random positions every 60 frames 
 if (frameCount % 60 === 0) {
  cloud = createSprite(width + 20, height - 300, 40, 10);
  cloud.velocityX = -3;
  cloud.addImage(cloudImage);
  cloud.scale = 0.4;
  cloud.y = Math.round(random(10,60));
  cloud.depth = trex.depth;
  trex.depth = trex.depth + 1;
  cloud.lifetime = width/3
  cg.add(cloud)
}
} 

//function to spawn the obstacles
function spawnObstacles() {
// make obstacles at random positions every 60 frames
if (frameCount % 60 === 0) {
  var obstacle = createSprite(600, height - 95, 20, 30)
  obstacle.velocityX = -(6 + s/100) 
  var a = Math.round(random(1,6))
  switch(a) {
    case 1 :
      obstacle.addImage(ob1)
    break; 
    case 2 :
      obstacle.addImage(ob2)
    break;
    case 3 :
      obstacle.addImage(ob3)
    break;
    case 4 :
      obstacle.addImage(ob4)
    break;
    case 5 :
      obstacle.addImage(ob5)
    break;
    case 6 :
      obstacle.addImage(ob6)
  }
  obstacle.scale = 0.5;
  obstacle.lifetime = width/6
  og.add(obstacle)
}
} 

function reset() {
  gameState = PLAY
  go.visible = false
  r.visible = false
  og.destroyEach()
  cg.destroyEach()
  s = 0
  
  trex.changeAnimation("running", trex_running)
}