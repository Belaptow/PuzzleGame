import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Dashboard } from "./components/Dashboard.jsx";
import * as Draggabilly from "draggabilly"

//ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));

var horizontalCount = document.getElementById("horizontal-slider").value
var verticalCount = document.getElementById("vertical-slider").value
var chunks = []
var imagesSrcArr = []
var currentSrc = ""
var isDragging = false
var currentDraggingId = ""
var triesCount = 0



//Установка положения грида поверх изображения
function setGridPos() {
    let imgClientRect = document.getElementById("imagegrid").getBoundingClientRect()
    document.getElementById("visual-grid").style.top = imgClientRect.top + "px"
    document.getElementById("visual-grid").style.left = imgClientRect.left + "px"
}

setGridPos()

//заполнение грида сеткой
function populateGrid() {

    document.getElementById("visual-grid").style.visibility = "visible"
    document.getElementById("imagegrid").style.border = "0"
    document.getElementById("preview-img").style.visibility = "hidden"

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

    //console.log("load clicked")
    //console.log(searchAdress + query)

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

//выбор случайного элемента
function setRandomSrc() {
    clearGeneratedChunks()

    chunks = []

    let randomInt = randomInteger(0, imagesSrcArr.length)

    let randomSrc = imagesSrcArr[randomInt]

    document.getElementById("imagegrid").setAttribute("src", randomSrc)

    //setVisualGridSize()
    setTimeout(setVisualGridSize, 500);

    currentSrc = randomSrc;

    populateGrid()
}

//Установка размеров грида в соответствии с размером img
function setVisualGridSize() {
    if (document.getElementById("imagegrid").height == 0 || document.getElementById("imagegrid").width == 0 || !document.getElementById("imagegrid").width || !document.getElementById("imagegrid").height) {
        //console.log("h or w = 0 or null")
        setTimeout(setVisualGridSize, 1000);
        return
    }
    document.getElementById("visual-grid").style.height = document.getElementById("imagegrid").height + "px"
    document.getElementById("visual-grid").style.width = document.getElementById("imagegrid").width + "px"

    document.getElementById("preview-img").style.height = document.getElementById("imagegrid").height / 3 + "px"
    document.getElementById("preview-img").style.width = document.getElementById("imagegrid").width / 3 + "px"

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
    triesCount = 0
    document.getElementById("tries-count").innerHTML = "Tries: " + triesCount
}

//TEST FUNCTION DELETE IN PROD
document.onmousemove = (e) => {
    document.getElementById("mouse-coor").innerHTML = "X: " + e.pageX + "<br/>Y: " + e.pageY
}

//Проверка над грид и над ячейкой
function checkIfInGrid(e) {
    let targetRect = e.target.getBoundingClientRect()
    let gridRect = document.getElementById("visual-grid").getBoundingClientRect()

    let minX = gridRect.left
    let minY = gridRect.top
    let maxX = minX + gridRect.width
    let maxY = minY + gridRect.height

    //console.log("left top X: " + minX + " Y: " + minY + "\nright bottom X: " + maxX + " Y: " + maxY)

    let mouseX = e.pageX
    let mouseY = e.pageY

    let isMouseOverGrid = (mouseX > minX && mouseX < maxX && mouseY > minY && mouseY < maxY)

    //console.log("isMouseOverGrid? " + isMouseOverGrid)

    if (!isMouseOverGrid) return false

    let elementsCollection = document.getElementById("visual-grid").children

    for (let i = 0; i < elementsCollection.length; i++) {

        let cellRect = elementsCollection[i].getBoundingClientRect()

        let minX = cellRect.left
        let minY = cellRect.top
        let maxX = minX + cellRect.width
        let maxY = minY + cellRect.height

        let isMouseOverCell = (mouseX > minX && mouseX < maxX && mouseY > minY && mouseY < maxY)

        if (isMouseOverCell) {

            if (elementsCollection[i].childElementCount > 0) {
                return false
            }

            e.target.style.left = 0
            e.target.style.top = 0
            e.target.style.position = "relative"

            elementsCollection[i].appendChild(e.target)
            break;
        }
    }
    return isMouseOverGrid
}

//Генерация частей изображения
function generateChunks() {
    if (currentSrc == "") return

    clearGeneratedChunks()

    document.getElementById("visual-grid").style.visibility = "visible"

    chunks = []

    document.getElementById("preview-img").style.visibility = "visible"
    document.getElementById("preview-img").setAttribute("src", currentSrc)

    let chunksCount = horizontalCount * verticalCount

    let chunkWidth = document.getElementById("imagegrid").width / horizontalCount
    let chunkHeight = document.getElementById("imagegrid").height / verticalCount

    document.getElementById("imagegrid").style.visibility = "hidden"

    let horizontalPos = 0
    let verticalPos = 0

    let imageGridTop = document.getElementById("imagegrid").getBoundingClientRect().top
    let bodyClientH = document.body.clientHeight

    //console.log(imageGridTop + " ---- " + bodyClientH)

    for (let i = 0; i < chunksCount; i++) {
        var chunk = document.createElement("div")

        chunk.style.height = chunkHeight + "px"
        chunk.style.width = chunkWidth + "px"

        chunk.id = "chunk-" + i

        chunk.classList.add("chunk")

        chunk.style.background = "transparent url(" + currentSrc + ") -" + (chunkWidth * horizontalPos) + "px -" + (chunkHeight * verticalPos) + "px no-repeat"

        //start of draggably
        let drag = new Draggabilly(chunk, {})

        drag.on("dragStart", (e) => {
            //console.log(e.target.id)
            e.target.style.zIndex = 1000;
            e.target.style.position = "absolute";
            moveAt(e)
            document.body.appendChild(e.target)
        })

        drag.on("dragEnd", (e) => {
            if (!checkIfInGrid(e)) {
                e.target.style.position = "absolute";
                moveAt(e)
                document.body.appendChild(e.target)
            }
            e.target.style.zIndex = 0
        })
        //end of draggably

        chunk.style.position = "absolute"

        chunk.style.top = randomInteger(imageGridTop, bodyClientH - 10) + "px"
        chunk.style.left = randomInteger(0, document.body.clientWidth - 10) + "px"

        horizontalPos++
        if (horizontalPos == horizontalCount) {
            horizontalPos = 0
            verticalPos++
        }

        document.body.appendChild(chunk)

        //chunk.onmousedown = function (e) {
        //    // 1. отследить нажатие
        //    //console.log(e.target.id)
        //    // подготовить к перемещению
        //    // 2. разместить на том же месте, но в абсолютных координатах
        //    e.target.style.position = "absolute"
        //    moveAt(e)
        //    // переместим в body, чтобы мяч был точно не внутри position:relative
        //    document.body.appendChild(e.target)

        //    e.target.style.zIndex = 1000 // показывать мяч над другими элементами

        //    // 3, перемещать по экрану
        //    document.onmousemove = function (e) {
        //        moveAt(e)
        //    };

        //    // 4. отследить окончание переноса
        //    e.target.onmouseup = function (e) {
        //        checkIfInGrid(e)
        //        isDragging = false
        //        currentDraggingId = ""
        //        document.onmousemove = null
        //        e.target.onmouseup = null
        //        e.target.style.zIndex = 0
        //    }
        //}
        chunks.push(chunk);
    }
}

document.getElementById("check-if-completed").onclick = (e) => {

    triesCount++
    document.getElementById("tries-count").innerHTML = "Tries: " + triesCount

    document.getElementById("visual-grid").style.border = "0"

    let elementsCollection = document.getElementById("visual-grid").children

    let isCorrect = true

    for (let i = 0; i < elementsCollection.length; i++) {
        let element = elementsCollection[i]

        element.style.border = "0.2px solid black"

        if (element.childElementCount < 1) {
            //console.log(element.id + " is empty")
            element.style.border = "1px solid red"
            isCorrect = false
            continue
        }

        if (element.firstChild.id.split('-')[1] != element.id.split('-')[1]) {
            //console.log(element.id + " has incorrect image")
            element.style.border = "1px solid red"
            isCorrect = false
            continue
        }
    }

    if (!isCorrect) {
        return
    }
    document.getElementById("visual-grid").style.visibility = "hidden"
    document.getElementById("imagegrid").style.border = "4px solid green"
    clearGeneratedChunks()
    document.getElementById("imagegrid").style.visibility = "visible"
    document.getElementById("preview-img").style.visibility = "hidden"
}


