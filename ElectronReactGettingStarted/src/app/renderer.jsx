import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Dashboard } from "./components/Dashboard.jsx";

ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));

var horizontalCount = document.getElementById("horizontal-slider").value
var verticalCount = document.getElementById("vertical-slider").value
var chunks = []
var imagesSrcArr = []
var currentSrc = ""
var isDragging = false
var currentDraggingId = ""



//Установка положения грида поверх изображения
function setGridPos() {
    let imgClientRect = document.getElementById("imagegrid").getBoundingClientRect()
    document.getElementById("visual-grid").style.top = imgClientRect.top + "px"
    document.getElementById("visual-grid").style.left = imgClientRect.left + "px"
}

setGridPos()

function onMouseEnterGridItem(e) {
    //if (!isDragging) return
    e.target.style.border = "2px groove blue"
}

function onMouseOutGridItem(e) {
    e.target.style.border = "0.2px solid black"
}

//заполнение грида сеткой
function populateGrid() {

    horizontalCount = document.getElementById("horizontal-slider").value
    verticalCount = document.getElementById("vertical-slider").value

    let cellsCount = horizontalCount * verticalCount

    document.getElementById("visual-grid").innerHTML = ""

    document.getElementById("visual-grid").style.gridTemplateColumns = "repeat(" + horizontalCount + ", 1fr)"
    document.getElementById("visual-grid").style.gridTemplateRows = "repeat(" + verticalCount + ", 1fr)"

    for (let i = 0; i < cellsCount; i++) {
        var gridCell = document.createElement("div");

        gridCell.id = "cell-" + i

        gridCell.classList.add("grid-item")

        gridCell.onmouseenter = (e) => {
            onMouseEnterGridItem(e)
        }

        gridCell.onmouseleave = (e) => {
            onMouseOutGridItem(e)
        }

        document.getElementById("visual-grid").appendChild(gridCell)
    }
}

populateGrid()

window.onresize = (e) => {
    setGridPos()
}

//изменение значения слайдера для вертикали
document.getElementById("vertical-slider").oninput = (e) => {
    document.getElementById("vertical-span").innerHTML = e.target.value
    clearGeneratedChunks()
    populateGrid()
}

//изменение значения слайдера для горизонтали
document.getElementById("horizontal-slider").oninput = (e) => {
    document.getElementById("horizontal-span").innerHTML = e.target.value
    clearGeneratedChunks()
    populateGrid()
}

//Разбить изборажение на чанки
document.getElementById("separate-to-chunks").onclick = (e) => {
    generateChunks()
};

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

    searchResDoc.querySelectorAll("img.wallpapers__item__img").forEach((img) => {
        imagesSrcArr.push(img.getAttribute("src"))
    })

    setRandomSrc()
}

function setRandomSrc() {
    clearGeneratedChunks()

    chunks = []

    let randomInt = randomInteger(0, imagesSrcArr.length)

    let randomSrc = imagesSrcArr[randomInt]

    document.getElementById("imagegrid").setAttribute("src", randomSrc)

    //setVisualGridSize()
    setTimeout(setVisualGridSize, 500);

    currentSrc = randomSrc;
}

//Установка размеров грида в соответствии с размером img
function setVisualGridSize() {
    if (document.getElementById("imagegrid").height == 0 || document.getElementById("imagegrid").width == 0 || !document.getElementById("imagegrid").width || !document.getElementById("imagegrid").height) {
        console.log("h or w = 0 or null")
        setTimeout(setVisualGridSize, 1000);
        return
    }
    document.getElementById("visual-grid").style.height = document.getElementById("imagegrid").height + "px"
    document.getElementById("visual-grid").style.width = document.getElementById("imagegrid").width + "px"
    setGridPos()
}

//обработка выбора случайного изображения
document.getElementById("random-image-button").onclick = (e) => {
    if (imagesSrcArr.length == 0) return
    setRandomSrc()
}

// передвинуть мяч под координаты курсора
// и сдвинуть на половину ширины/высоты для центрирования
function moveAt(e) {
    isDragging = true
    currentDraggingId = e.target.id
    e.target.style.left = e.pageX - e.target.offsetWidth / 2 + "px";
    e.target.style.top = e.pageY - e.target.offsetHeight / 2 + "px";
}

//очистка сгенерированных чанков
function clearGeneratedChunks() {
    document.getElementById("imagegrid").style.visibility = "visible"
    chunks.forEach((element) => {
        document.getElementById(element.id).remove()
    })
    chunks = []
}

function checkIfInGrid(e) {
    let targetRect = e.target.getBoundingClientRect()
    let gridRect = document.getElementById("visual-grid").getBoundingClientRect()

    let minX = gridRect.top
    let minY = gridRect.left
    let maxX = minX + gridRect.height
    let maxY = minY + gridRect.width

    let targetX = targetRect.top + targetRect.height / 2
    let targetY = targetRect.left + targetRect.width / 2

    let isOverGrid = (targetX > minX && targetX < maxX && targetY > minY && targetY < maxY)

    if (!isOverGrid) return false

    let elementsCollection = document.getElementById("visual-grid").children

    for (let i = 0; i < elementsCollection.length; i++) {

        let cellRect = elementsCollection[i].getBoundingClientRect()

        let minX = cellRect.top
        let minY = cellRect.left
        let maxX = minX + cellRect.height
        let maxY = minY + cellRect.width

        let isOverCell = (targetX > minX && targetX < maxX && targetY > minY && targetY < maxY)
        console.log("isOverCell: " + isOverCell)
        if (isOverCell) {
            console.log("over " + elementsCollection[i].id)

            if (elementsCollection[i].childElementCount > 0) {
                console.log("cell occupied")
                break;
            }

            e.target.style.left = 0
            e.target.style.top = 0
            e.target.style.position = "relative"

            elementsCollection[i].appendChild(e.target)
            break;
        }
    }

    //return (targetRect.top > minX && targetRect.top < maxX && targetRect.left > minY && targetRect.left < maxY)
    //return (targetX > minX && targetX < maxX && targetY > minY && targetY < maxY)
    return isOverGrid
}

//Генерация частей изображения
function generateChunks() {
    if (currentSrc == "") return

    clearGeneratedChunks()

    chunks = []

    let chunksCount = horizontalCount * verticalCount

    let chunkWidth = document.getElementById("imagegrid").width / horizontalCount
    let chunkHeight = document.getElementById("imagegrid").height / verticalCount

    document.getElementById("imagegrid").style.visibility = "hidden"

    let horizontalPos = 0
    let verticalPos = 0

    for (let i = 0; i < chunksCount; i++) {
        var chunk = document.createElement("div")

        chunk.style.height = chunkHeight + "px"
        chunk.style.width = chunkWidth + "px"

        chunk.innerText = i
        chunk.id = "chunk-" + i


        chunk.style.top = randomInteger(document.getElementById("imagegrid").getBoundingClientRect().top, document.body.clientHeight - 10) + "px"
        chunk.style.left = randomInteger(0, document.body.clientWidth - 10) + "px"

        chunk.classList.add("chunk")

        chunk.style.background = "transparent url(" + currentSrc + ") -" + (chunkWidth * horizontalPos) + "px -" + (chunkHeight * verticalPos) + "px no-repeat"

        horizontalPos++
        if (horizontalPos == horizontalCount) {
            horizontalPos = 0
            verticalPos++
        }

        document.body.appendChild(chunk)

        chunk.onmousedown = function (e) {
            // 1. отследить нажатие
            console.log(e.target.id)
            // подготовить к перемещению
            // 2. разместить на том же месте, но в абсолютных координатах
            e.target.style.position = "absolute"
            moveAt(e)
            // переместим в body, чтобы мяч был точно не внутри position:relative
            document.body.appendChild(e.target)

            e.target.style.zIndex = 1000 // показывать мяч над другими элементами

            // 3, перемещать по экрану
            document.onmousemove = function (e) {
                moveAt(e)
            };

            // 4. отследить окончание переноса
            e.target.onmouseup = function (e) {
                console.log(checkIfInGrid(e))
                isDragging = false
                currentDraggingId = ""
                document.onmousemove = null
                e.target.onmouseup = null
                e.target.style.zIndex = 0
            }
        }
        chunks.push(chunk);
    }
}



