import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Dashboard } from "./components/Dashboard.jsx";

ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));

//Получение случайного числа между min(влючая) и max(не включая)
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

//Получение случайного целого числа между min(влючая) и max(не включая)
function randomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

//Получить строку GET запросом
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

var imagesSrcArr = []

//Обработка загрузки изображений
document.getElementById("load-images-button").onclick = (e) => {
    imagesSrcArr = []

    let searchAdress = "https://www.goodfon.ru/search/?q="
    let query = document.getElementById("search-bar").value;

    console.log("load clicked")
    console.log(searchAdress + query)

    let responseString = httpGet(searchAdress + query);

    let headRegex = /<head>.*<\/head>/gs
    let headString = responseString.match(headRegex)[0]

    let bodyRegex = /<body>.*<\/body>/gs
    let bodyString = responseString.match(bodyRegex)[0]

    let searchResDoc = document.implementation.createHTMLDocument()

    searchResDoc.head.innerHTML = headString
    searchResDoc.body.innerHTML = bodyString
    console.log(searchResDoc)

    searchResDoc.querySelectorAll("img.wallpapers__item__img").forEach((img) => {
        imagesSrcArr.push(img.getAttribute("src"))
    })

    console.log(imagesSrcArr)

    setRandomSrc()
}

function setRandomSrc() {
    let randomInt = randomInteger(0, imagesSrcArr.length)
    console.log(randomInt)

    let randomSrc = imagesSrcArr[randomInt]
    console.log(randomSrc)

    document.getElementById("imagegrid").setAttribute("src", randomSrc)
}

//обработка выбора случайного изображения
document.getElementById("random-image-button").onclick = (e) => {
    console.log("random clicked")
    if (imagesSrcArr.length == 0) return
    setRandomSrc()
}

// передвинуть мяч под координаты курсора
// и сдвинуть на половину ширины/высоты для центрирования
function moveAt(e) {
    e.target.style.left = e.pageX - e.target.offsetWidth / 2 + "px";
    e.target.style.top = e.pageY - e.target.offsetHeight / 2 + "px";
}

let balls = [];
for (let i = 0; i < 20; i++) {
    var ball = document.createElement("div");
    ball.innerText = i;
    ball.classList.add("ball");
    ball.id = i;
    document.getElementById("chunks").appendChild(ball);
    ball.onmousedown = function (e) {
        // 1. отследить нажатие
        console.log(e.target.id)
        // подготовить к перемещению
        // 2. разместить на том же месте, но в абсолютных координатах
        e.target.style.position = "absolute";
        moveAt(e);
        // переместим в body, чтобы мяч был точно не внутри position:relative
        document.body.appendChild(e.target);

        e.target.style.zIndex = 1000; // показывать мяч над другими элементами

        // 3, перемещать по экрану
        document.onmousemove = function (e) {
            moveAt(e);
        };

        // 4. отследить окончание переноса
        e.target.onmouseup = function () {
            document.onmousemove = null;
            e.target.onmouseup = null;
            e.target.style.zIndex = 0;
        };
    };
    balls.push(ball);
}