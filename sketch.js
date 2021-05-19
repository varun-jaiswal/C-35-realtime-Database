var ball;
var database;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,20,20);
    ball.shapeColor = "skyblue";

    database = firebase.database()//intialzing firebase and database
    var ballPositionRef=database.ref("ball/position")
    ballPositionRef.on("value",readPosition,showError)//reading ball/position


}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
    writePosition(ball.x,ball.y)
}

function readPosition(data){
var pos=data.val()
var x=pos.x
var y=pos.y
console.log(x)
console.log(y)
ball.x=x
ball.y=y
}

function showError(){

}

function writePosition(x,y){
    var ballPositionRef=database.ref("ball/position")
    ballPositionRef.set({
        "x":x,"y":y
    })
}