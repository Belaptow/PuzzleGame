require('./splitView.css');


document.getElementById("puzzle-game").onclick = (e) => {
    console.log("puzzle-game")
    document.getElementById("contents").setAttribute("src", "./index.html")
}

document.getElementById("game-of-life").onclick = (e) => {
    console.log("game-of-life")
}