require('./splitView.css');


document.getElementById("puzzle-game").onclick = (e) => {
    console.log("puzzle-game")
    document.getElementById("contents").setAttribute("src", "./index.html")
}

document.getElementById("game-of-life").onclick = (e) => {
    console.log("game-of-life")
}

document.getElementById("calculator").onclick = (e) => {
    console.log("calculator")
    document.getElementById("contents").setAttribute("src", "./calculatorPage.html")
}

document.getElementById("timer").onclick = (e) => {
    console.log("timer")
    document.getElementById("contents").setAttribute("src", "./timerPage.html")
}

document.getElementById("data-structures").onclick = (e) => {
    console.log("data-structures")
    document.getElementById("contents").setAttribute("src", "./datastructPage.html")
}