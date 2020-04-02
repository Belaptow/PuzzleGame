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
        // 1. ��������� �������

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