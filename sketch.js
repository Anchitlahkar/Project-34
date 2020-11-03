var dog, happyDog,foodS, foodStock
var database
var time = 10000
var reset

function preload(){
  dogImg = loadImage('images/dogImg.png')
  doghappyImg = loadImage('images/dogImg1.png')
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);

  
  dog = createSprite(250,250,50,50)
  dog.addImage(dogImg)
  dog.scale = 0.2
  

  reset = createButton('Buy Food')
  reset.position(820,540)

}


function draw() {
  background(46,19,87)

  time = time -1
  console.log(time)
  
  foodStock = database.ref('Food')
  foodStock.on("value",readStock)
  
  drawSprites();
  
  if (keyWentDown(UP_ARROW) && foodS !== 0){
    writeStock(foodS)
    time = 1000
    dog.addImage(doghappyImg)
  }
  if(keyWentDown(UP_ARROW) && foodS === 0){
    alert("Please Buy Some Food for Your Dog")
  }
  textSize(20)
  fill("White")
  text("Note Press UP Arrow key to feed Your Dog",50,480)


  if(foodS !== undefined){
    fill("white")
    textSize(20)
    text("Food left = "+foodS,50,30)
  }
  if(time === 0){
    dog.addImage(dogImg)
  }

  if (foodS<5) {
    reset.mousePressed(()=>{
      writeStockUpdate(foodS)
    }) 
  }
  else{
    reset.mousePressed(()=>{
      alert("You have Sufficient Food")
    }) 
  }
}

function readStock(data) {
  foodS=data.val()
}

function writeStock(x){
  database.ref('/').update({
    Food: x -1
  })
  console.log(foodS)  
}

function writeStockUpdate(x){
  database.ref('/').update({
    Food: 20
  })
  console.log(foodS)  
}