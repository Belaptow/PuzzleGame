import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Dashboard } from "./components/Dashboard.jsx";

ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));

var visualGrid = document.getElementById("visual-grid")
var balls = []
var imagesSrcArr = []

//��������� ��������� ����� ������ �����������
function setGridPos() {
    let imgClientRect = document.getElementById("imagegrid").getBoundingClientRect()
    document.getElementById("visual-grid").style.top = imgClientRect.top + "px"
    document.getElementById("visual-grid").style.left = imgClientRect.left + "px"
}

setGridPos()

//���������� ����� ������
function populateGrid() {
    let innerHTMLstring = ""
    let divLeft = "<div class='grid-item' "
    let divRight = "></div>"
    let horizontalCount = document.getElementById("horizontal-slider").value
    let verticalCount = document.getElementById("vertical-slider").value
    let cellsCount = horizontalCount * verticalCount
    document.getElementById("visual-grid").innerHTML = ""
    for (let i = 0; i < cellsCount; i++) {
        innerHTMLstring += divLeft + "id='cell-" + i + "'" + divRight
    }
    document.getElementById("visual-grid").style.gridTemplateColumns = "repeat(" + horizontalCount + ", 1fr)"
    document.getElementById("visual-grid").style.gridTemplateRows = "repeat(" + verticalCount + ", 1fr)"
    document.getElementById("visual-grid").innerHTML = innerHTMLstring
}

populateGrid()

window.onresize = (e) => {
    setGridPos()
}

//��������� �������� �������� ��� ���������
document.getElementById("vertical-slider").oninput = (e) => {
    document.getElementById("vertical-span").innerHTML = e.target.value
    populateGrid()
}

//��������� �������� �������� ��� �����������
document.getElementById("horizontal-slider").oninput = (e) => {
    document.getElementById("horizontal-span").innerHTML = e.target.value
    populateGrid()
}

//������� ����������� �� �����
document.getElementById("separate-to-chunks").onclick = (e) => {
    console.log("��������� ������")
    generateChunks()
};

//��������� ���������� ������ ����� ����� min(������) � max(�� �������)
function randomInteger(min, max) {
    // ��������� ����� �� min �� (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

//�������� ������ GET ��������
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

//��������� �������� �����������
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

    searchResDoc.querySelectorAll("img.wallpapers__item__img").forEach((img) => {
        imagesSrcArr.push(img.getAttribute("src"))
    })

    setRandomSrc()
}

function setRandomSrc() {
    let randomInt = randomInteger(0, imagesSrcArr.length)
    console.log(randomInt)

    let randomSrc = imagesSrcArr[randomInt]
    console.log(randomSrc)

    document.getElementById("imagegrid").setAttribute("src", randomSrc)
}

//��������� ������ ���������� �����������
document.getElementById("random-image-button").onclick = (e) => {
    console.log("random clicked")
    if (imagesSrcArr.length == 0) return
    setRandomSrc()
}

// ����������� ��� ��� ���������� �������
// � �������� �� �������� ������/������ ��� �������������
function moveAt(e) {
    e.target.style.left = e.pageX - e.target.offsetWidth / 2 + "px";
    e.target.style.top = e.pageY - e.target.offsetHeight / 2 + "px";
}

function generateChunks() {
    if (balls.length != 0) return
    balls = []
    for (let i = 0; i < 20; i++) {
        var ball = document.createElement("div");
        ball.innerText = i;
        ball.classList.add("ball");
        ball.id = i;
        document.getElementById("chunks").appendChild(ball);
        ball.onmousedown = function (e) {
            // 1. ��������� �������
            console.log(e.target.id)
            // ����������� � �����������
            // 2. ���������� �� ��� �� �����, �� � ���������� �����������
            e.target.style.position = "absolute";
            moveAt(e);
            // ���������� � body, ����� ��� ��� ����� �� ������ position:relative
            document.body.appendChild(e.target);

            e.target.style.zIndex = 1000; // ���������� ��� ��� ������� ����������

            // 3, ���������� �� ������
            document.onmousemove = function (e) {
                moveAt(e);
            };

            // 4. ��������� ��������� ��������
            e.target.onmouseup = function () {
                document.onmousemove = null;
                e.target.onmouseup = null;
                e.target.style.zIndex = 0;
            };
        };
        balls.push(ball);
    }
}

