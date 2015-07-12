function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    triangle.move();
    for (i = 0; i < circles.length; i++) {
        circles[i].move();
    }
    for (i = 0; i < shots.length; i++) {
        if (shots[i].y <= 0) {
            shots.splice(i, 1);
        } else {
            console.log("Ok: " + i);
            shots[i].move();
        }
    }
    ctx.beginPath()
    triangle.draw();
    for (i = 0; i < circles.length; i++) {
        circles[i].draw();
    }
    ctx.fill();
    ctx.beginPath();
    for (i = 0; i < shots.length; i++) {
        shots[i].draw();
    }
    ctx.stroke();
    window.requestAnimationFrame(update);
}

function Triangle()
{
    this.x = canvas.width / 2;
    this.y = canvas.height - triangleHeight;
    this.size = triangleSize;
    this.speed = triangleSpeed;
    this.direction = null;
    this.move = function () {
        if (this.direction == "right" && canvas.width - this.x) {
            this.x += this.speed;
        } else if (this.direction == "left") {
            this.x -= this.speed;
        }
    }
    this.draw = function () {
        drawTriangle(this.x, this.y, this.size);
    }
}

function Circle(x)
{
    this.x = x;
    this.y = -(circleRadius);
    this.move = function () {
        this.y += circleSpeed;
        if (this.y >= canvas.height + circleRadius) {
            gameOver();
        }
    }
    this.draw = function () {
        drawCircle(this.x, this.y, circleRadius);
    }
}

function Shot(x)
{
    this.x = x;
    this.y = canvas.height - triangleHeight;
    this.move = function () {
        this.y -= shotSpeed;
        for (i = 0; i < circles.length; i++) {
            if (this.y - shotLength <= circles[i].y + circleRadius && this.x >= circles[i].x - circleRadius && this.x <= circles[i].x + circleRadius) {
                circles.splice(i, 1);
                circles.push(new Circle(Math.floor(Math.random() * (canvas.width + 1))));
                circles.push(new Circle(Math.floor(Math.random() * (canvas.width + 1))));
                score++;
                scoreDisplay.innerHTML = score;
            }
        }
    }
    this.draw = function () {
        drawShot(this.x, this.y);
    }
}

function drawTriangle(x, y, size)
{
    //ctx.beginPath();
    ctx.moveTo(x + size/2, y);
    ctx.lineTo(x - size/2, y);
    ctx.lineTo(x, y - size/2 * Math.sqrt(3));
    ctx.lineTo(x + size/2, y);
    //ctx.fill;
}

function drawCircle(x, y, radius)
{
    //ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    //ctx.closePath();
}

function drawShot(x, y)
{
    //ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - shotLength);
    //ctx.closePath();
}

function gameOver() {
    alert("Game over. You scored " + score + " points.");
    location.reload();
}

var canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = canvas.width * 9 / 16;
var ctx = canvas.getContext("2d");
var triangleSize = 30;
var triangleHeight = 50;
var triangleSpeed = canvas.width / 60 / 2; //15 = 60/4
var circleRadius = 15;
var circleSpeed = canvas.height / 60 / 4;
var shotSpeed = canvas.height / 1000;
var shotLength = triangleSize / 2;
var score = 0;
var scoreDisplay = document.getElementById("score");
ctx.fillStyle = "#000000";
ctx.strokeStyle = "#000000";

var triangle = new Triangle();
var circles = [];
//circles[0] = new Circle(canvas.width / 2);
var shots = [];

window.requestAnimationFrame(update);

window.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:
            //left
            if (triangle.direction === null) {
                triangle.direction = "left";
            }
            break;
        case 39:
            //right
            if (triangle.direction === null) {
                triangle.direction = "right";
            }
            break;
        case 32:
            //space
            shots.push(new Shot(triangle.x));
            break;
    }
};

window.onkeyup = function (event) {
    switch (event.keyCode) {
        case 37:
            //left
            if (triangle.direction == "left") {
                triangle.direction = null;
            }
            break;
        case 39:
            //right
            if (triangle.direction == "right") {
                triangle.direction = null;
            }
            break;
    }
};