
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var PLAY = 1;
var END = 0;
var Estado_de_jogo = PLAY;
var score = 0;

var fundoImg, fundo;
var barreira, barreiraImg;
var indiana_jones, indianaImg, correndo;
var gameOverImg, gameOver;
var restartImg, restart;

var bola_de_pedra, bola_de_pedraImg;
var solo, soloImg;

var parado, solo1, soloinvisivel;

function preload(){
  
indianaImg = loadAnimation("I1.gif", "I2.gif", "I3.gif", "I4.gif", "I5.gif", "I6.gif", "I7.gif", "I8.gif");
fundoImg = loadImage("fundo jogo indiana.png");
barreiraImg = loadImage("obstaculo_do_jogo.png");
gameOverImg = loadImage("fim de jogo.png");
restartImg = loadImage("reset.png");

groupBarreira = new Group();
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;
  
  fundo = createSprite(600, 600, 600, 600)
  fundo.addImage(fundoImg);
  fundo.velocityX = -6;
  fundo.scale = 40

  soloinvisivel = createSprite(width/2,height-15,width,20)

  indiana_jones = createSprite(400, 600, 100, 100);
  indiana_jones.addAnimation("correndo",indianaImg);
  indiana_jones.scale = 0.5;
  indiana_jones.velocityX = 0;
  indiana_jones.setCollider('rectangle', 0, 0, 140 ,450);

  gameOver = createSprite(500, 300, 10, 10);
  gameOver.addImage(gameOverImg);

  restart = createSprite(500, 530, 10, 10);
  restart.addImage(restartImg);

  gameOver.scale = 1;
  restart.scale = 0.18;

  gameOver.visible = false;
  restart.visible = false;

  var ball_options = {
    restitution: 0.95,
    frictionAir: 0.01

  }

  //prop = {density:0.0005}
  //bola_de_pedra = Bodies.circle(width / 2, height / 2, 20, prop);
  //World.add(world, bola_de_pedra);
  parado = {
    isStatic:true
  }

  solo1 = Bodies.rectangle(width/2,height-10,width,20,parado);
  World.add(world, solo1);
  rectMode(CENTER)

  solo = new Solo(width / 2, height - 5, width, 20);

  edges = createEdgeSprites();
}


function draw() {
  indiana_jones.debug=true
  groupBarreira.debug=true
  //background(fundoImg);
  Engine.update(engine);
  drawSprites();
  textSize(20);
  fill("white");
  text("Pontos:" + score, 50, 50);

  if (Estado_de_jogo === PLAY){
    score = score + Math.round(getFrameRate() / 60);
    groupBarreira.setVelocityXEach(6 + 4 * score / 100);
    fundo.velocityX = -(6 + 3 * score / 100);
 
 if (keyDown("SPACE") && indiana_jones.y >= height -230) {
  indiana_jones.velocityY = -12;
 }
 
 indiana_jones.velocityY += 0.8;
 indiana_jones.collide(soloinvisivel);
 
 if (indiana_jones.isTouching(groupBarreira)){

    Estado_de_jogo = END
 }
 
 if (fundo.x < 100) {
     fundo.x = fundo.x = 300;
 }
 
 
 }
 
 if (Estado_de_jogo === END){
    gameOver.visible = true;
    restart.visible = true;
     
    textSize(20);
    fill("white");
    text("clique no (ESPAÇO) para reiniciar", 200, 455);
 
    fundo.velocityX = 0;
    indiana_jones.velocityY = 0;
    groupBarreira.setVelocityXEach(0);
 
    if (keyDown("SPACE")) {
    reset();
  }
}
  solo.show()
  
  //ellipse(ball.position.x, ball.position.y, 20);
   
 
  rect(solo1.position.x, solo1.position.y, width, 20);
  fill("brown")

  spawnBarreiras(); 
}

function spawnBarreiras() {

  if (frameCount % 100 === 0){ 
  var barreira = createSprite(1900,850,10,10);
  barreira.addImage(barreiraImg);   
  barreira.scale = 1.5 ;
  barreira.velocityX += 3;
  barreira.lifetime = 600
  barreira.depth = indiana_jones.depth;
  indiana_jones.depth += 2;
  barreira.setCollider("rectangle", -1 ,0, 5 , 100);
  barreira.debug = false;
  
  groupBarreira.add(barreira);
}
  
}

function reset() {

Estado_de_jogo = PLAY; 

gameOver.visible = false;
restart.visible = false;

groupBarreira.destroyEach();

score = 0;
}
  

