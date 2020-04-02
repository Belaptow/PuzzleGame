import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Dashboard } from "./components/Dashboard.jsx";

ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));

function moveAt(e) {
    e.target.style.left = e.pageX - e.target.offsetWidth / 2 + "px";
    e.target.style.top = e.pageY - e.target.offsetHeight / 2 + "px";
}

let balls = [];
for (let i = 0; i < 10; i++) {
    var ball = document.createElement("div");
    ball.innerText = i;
    ball.classList.add("ball");
    ball.id = i;
    document.body.appendChild(ball);
    ball.onmousedown = function (e) {
        // 1. отследить нажатие

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