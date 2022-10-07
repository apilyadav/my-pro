var bg,bgImg;
var rocket, rocketImg, flyer_flying;
var asteroid, asteroidImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var asteroidGroup;



function preload(){
  
  heart1Img = loadImage("assets/heart(1).png")
  heart2Img = loadImage("assets/heart(2).png")
  heart3Img = loadImage("assets/heart(3).png")

  rocketImg = loadImage("assets/rocket(1).png")
  flyer_flying = loadImage("assets/rocket(2).png")

  asteroidImg = loadImage("assets/asteroid.png")

  bgImg = loadImage("assets/bg.jpg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
rocket = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 rocket.addImage(shooterImg)
   rocket.scale = 0.3
   rocket.debug = true
   rocket.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating group for zombies    
    asteroidGroup = new Group();
}

function draw() {
  background(0); 

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  rocket.y = rocket.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 rocket.y = rocket.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){

 rocket .addImage(flyer_flying)
  
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  rocket.addImage(rocketImg)
}


//destroy asteroid when rocket touches it
if(asteroidGroup.isTouching(rocket)){
 

 for(var i=0;i<asteroidGroup.length;i++){     
      
  if(asteroidGroup[i].isTouching(rocket)){
       asteroidGroup[i].destroy()
      // life=life+1
       } 
 }
}

//calling the function to spawn asteroid
enemy();

drawSprites();
}



//creating function to spawn asteroid
function enemy(){
  if(frameCount%50===0){
var x,y
    //giving random x and y positions for zombie to appear
    asteroid = createSprite(random(500,1100),random(100,500),40,40)


    asteroid.addImage(asteroidImg)
    asteroid.scale = 0.15
    asteroid.velocityX = -3
    asteroid.debug= false
    asteroid.setCollider("rectangle",0,0,400,400)
   
    asteroid.lifetime = 400
   asteroidGroup.add(asteroid)
  }

}
