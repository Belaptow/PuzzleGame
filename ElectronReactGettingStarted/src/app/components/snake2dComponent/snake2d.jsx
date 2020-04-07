require('./snake2d.css');

var step = 18;
var partSide = 18;
var margin = 2;

var speed = 1;

var playing = false;
var arrowPressed = false;

var appleSide = 18;

var count = 0;

var canvas = document.getElementById("main-canvas")
canvas.width = 860;
canvas.height = 650;
var context = canvas.getContext("2d");

context.fillStyle = "white"
context.save()

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.draw = this.draw.bind(this)

        this.draw()
    }

    draw() {
        if (this.x < 0) this.x = canvas.width + this.x
        if (this.x >= canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height + this.y
        if (this.y >= canvas.height) this.y = 0
        context.fillRect(this.x, this.y, partSide, partSide)
    }
}

class Snake {
    constructor() {
        this.parts = []
        this.length = 4;
        this.xDir = 0;
        this.yDir = -1;

        this.appleCoor = getRandomCoor()

        this.init = this.init.bind(this)
        this.drawNextStep = this.drawNextStep.bind(this)
        this.addPart = this.addPart.bind(this)
    }

    init() {
        context.clearRect(0, 0, canvas.width, canvas.height)
        this.parts = []
        for (let i = 0; i < this.length; i++) {
            if (this.parts.length == 0) {
                this.parts.push(new SnakePart(canvas.height / 2, canvas.height / 2))
            } else {
                var prevPart = this.parts[i - 1]
                this.parts.push(new SnakePart(prevPart.x, prevPart.y + partSide + margin))
            }
        }
        drawApple(this.appleCoor[0], this.appleCoor[1])
    }

    addPart() {
        //console.log("add in snake")
        var prevPart = this.parts[this.length - 1]
        this.length++
        this.parts.push(new SnakePart(prevPart.x + ((partSide + margin) * this.xDir), prevPart.y + ((partSide + margin) * this.yDir)))
        this.parts[this.length - 1].draw()
    }

    drawNextStep() {
        context.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = this.length - 1; i >= 0; i--) {
            if (i == 0) {
                context.fillStyle = "green"

                this.parts[i].x += this.xDir * (step + margin)
                this.parts[i].y += this.yDir * (step + margin)

                if (this.parts[i].x < 0) this.parts[i].x = canvas.width + this.parts[i].x
                if (this.parts[i].x >= canvas.width) this.parts[i].x = 0
                if (this.parts[i].y < 0) this.parts[i].y = canvas.height + this.parts[i].y
                if (this.parts[i].y >= canvas.height) this.parts[i].y = 0

                let headX = this.parts[i].x
                let headY = this.parts[i].y

                for (let i = 2; i < this.length - 1; i++) {
                    if (headX == this.parts[i].x && headY == this.parts[i].y) {
                        //console.log("caught tail")
                        playing = false;
                        context.fillStyle = "red"
                        break;
                    }
                }

                if (headX + (partSide / 2) > this.appleCoor[0] - (appleSide / 2) && headX + (partSide / 2) < this.appleCoor[0] + (appleSide / 2)) {
                    if (headY + (partSide / 2) > this.appleCoor[1] - (appleSide / 2) && headY + (partSide / 2) < this.appleCoor[1] + (appleSide / 2)) {
                        //console.log("eaten")
                        count++;
                        document.getElementById("count").innerHTML = "Score: " + count
                        this.appleCoor = getRandomCoor()
                        this.addPart()
                    }
                }
            } else {
                this.parts[i].x = this.parts[i - 1].x
                this.parts[i].y = this.parts[i - 1].y
            }
            this.parts[i].draw()
        }
        document.getElementById("coor").innerHTML = "x: " + this.parts[0].x + " y: " + this.parts[0].y
        drawApple(this.appleCoor[0], this.appleCoor[1])
        arrowPressed = false
    }
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

var snake = new Snake()
snake.init()

function getRandomCoor() {
    let x = randomInteger(1, canvas.width / (step + margin)) * (step + margin) - ((step + margin) / 2)
    let y = randomInteger(1, canvas.height / (step + margin)) * (step + margin) - ((step + margin) / 2)
    return [x, y]
}

function drawApple(x, y) {
    context.fillStyle = "red"
    context.beginPath()
    context.arc(x, y, appleSide / 2, 0, 2 * Math.PI, false);
    context.fill();
    context.fillStyle = "white"
}

document.onkeydown = (e) => {
    let code = e.keyCode
    if (arrowPressed) return
    //console.log(code)
    switch (code) {
        case 37:
            //console.log("left")
            if (snake.xDir == 1) return;
            snake.xDir = -1;
            snake.yDir = 0;
            break;
        case 38:
            //console.log("up")
            if (snake.yDir == 1) return;
            snake.xDir = 0;
            snake.yDir = -1;
            break;
        case 39:
            //console.log("right")
            if (snake.xDir == -1) return;
            snake.xDir = 1;
            snake.yDir = 0;
            break;
        case 40:
            //console.log("down")
            if (snake.yDir == -1) return;
            snake.xDir = 0;
            snake.yDir = 1;
            break;
    }
    console.log("poke")
    arrowPressed = true
}

document.getElementById("start").onclick = (e) => {
    //console.log("start")
    if (playing) return
    clearFunc()
    playing = true
    gameOn()
}

document.getElementById("speed-up").onclick = (e) => {
    if (speed == 10) return;
    speed++;
    document.getElementById("speed").innerHTML = speed;
}

document.getElementById("speed-down").onclick = (e) => {
    if (speed == 1) return;
    speed--;
    document.getElementById("speed").innerHTML = speed;
}

function gameOn() {
    //console.log("next step")
    if (!playing) return
    snake.drawNextStep()
    setTimeout(gameOn, 110 - (10 * speed))
}

function clearFunc() {
    //console.log("clear")
    context.clearRect(0, 0, canvas.width, canvas.height)
    playing = false;
    snake = new Snake()
    snake.init()
}

document.getElementById("clear").onclick = (e) => {
    clearFunc()
}