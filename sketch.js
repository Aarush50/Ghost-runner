var tower,towerImage,ghost,ghostImage;
var door,doorImage,climber,climberImage;
var invisible,doorsGroup,climbersGroup,invisiblesGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var spookySound;
function preload(){
  towerImage=loadImage("tower.png");
  ghostImage=loadImage("ghost-standing.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  spookySound=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY=2;
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.4;
  doorsGroup=createGroup();
  climbersGroup=createGroup();
  invisiblesGroup=createGroup();
}
function draw(){
  background(0);
  if(gameState===PLAY){
  if(tower.y>500){
    tower.y=tower.width/2;
  } 
    spookySound.loop();
  if(keyDown("left")){
    ghost.x=ghost.x-5;
  }
    if(keyDown("right")){
      ghost.x=ghost.x+5;
    }
  if(keyDown("space")){
    ghost.velocityY=-3;
  }
  ghost.velocityY=ghost.velocityY+0.8;
    if(ghost.y>600||invisiblesGroup.isTouching(ghost)){
     ghost.destroy();
     gameState=END;
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
  spawnDoors();
     drawSprites();
  }
  if(gameState===END){
    fill ("yellow");
    textSize(30);
    text("GAMEOVER",230,250);
    
  }
}
function spawnDoors(){
  if(frameCount%200===0){
    door=createSprite(200,-50);
    climber=createSprite(200,10);
    door.addImage(doorImage);
    climber.addImage(climberImage);
    invisible=createSprite(200,15);
    invisible.width=climber.width;
    invisible.height=2;
    door.velocityY=1;
    climber.velocityY=1;
    invisible.velocityY=1;
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    door.x=Math.round(random(100,400));
    climber.x=door.x;
    invisible.x=door.x;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisiblesGroup.add(invisible);
    climber.lifetime=700;
    invisible.lifetime=700;
    door.lifetime=700;
    invisible.debug=true;
  }
}