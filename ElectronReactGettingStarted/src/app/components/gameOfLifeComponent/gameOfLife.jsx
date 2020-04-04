import * as ReactDOM from 'react-dom';
import * as React from 'react';

require("./gameOfLife.css")

var running = false
var mouseDown = false;

function mouseDownGrid(e) {
    mouseDown = true
    console.log("mouse down")
}

function mouseUpGrid(e) {
    mouseDown = false
    console.log("mouse up")
}

function setClassAlive(e) {
    e.target.className = "grid-cell-alive";
}

class Cell {
    constructor(top, left) {
        this.top = top
        this.left = left
        this.alive = (Math.random() >= 0.5)
        this.setDiv()
    }

    localMouseEnter(e) {
        if (!mouseDown) return
        console.log("local mouse over with press")
        this.alive = true
        setClassAlive(e)
    }

    localMouseDown(e) {
        console.log("local mouse down")
        console.log(e)
        setClassAlive(e)
    }

    setDiv() {
        this.div = <div className={"grid-cell-" + (this.alive ? "alive" : "dead")}
            id={"cell-" + this.top + "-" + this.left}
            draggable="false">
        </div>
    }

    getDiv() {
        return (this.div)
    }
}

class MainGrid extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentGrid: [],
            widthCount: 88,
            heightCount: 66,
            gen: 0,
            gridStyle: {}
        }

        this.startStop = this.startStop.bind(this)
        this.evolve = this.evolve.bind(this)
        this.formNewGrid = this.formNewGrid.bind(this)
        this.flattenArray = this.flattenArray.bind(this)
        this.getNewCell = this.getNewCell.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    startStop() {
        running = !running
        //console.log(running ? "Running" : "Stopping")
        this.evolve()
    }

    evolve() {
        if (!running) return
        this.formNewGrid()
        setTimeout(this.evolve, 50);
    }

    formNewGrid() {
        //console.log("formNewGrid")
        let allDead = true

        let newGrid = []

        for (let i = 0; i < this.state.heightCount; i++) {
            let tempRow = []
            for (let j = 0; j < this.state.widthCount; j++) {
                let newCell = new Cell(i, j)
                newCell.alive = this.state.currentGrid[i][j].alive

                if (newCell.alive) allDead = false

                newCell = this.getNewCell(newCell)
                newCell.setDiv()

                tempRow.push(newCell)
            }
            newGrid.push(tempRow)
        }
        if (allDead) this.startStop()
        this.setState({
            currentGrid: newGrid,
            gen: this.state.gen + 1
        })
    }

    getNewCell(cell) {
        let neighboursCount = 0

        let x = cell.left
        let y = cell.top

        if (y > 0) {
            if (x > 0) {
                if (this.state.currentGrid[y - 1][x - 1].alive) neighboursCount++; //top-left
            }

            if (this.state.currentGrid[y - 1][x].alive) neighboursCount++; //top

            if (x < (this.state.widthCount - 1)) {
                if (this.state.currentGrid[y - 1][x + 1].alive) neighboursCount++; //top-right
            }
        }

        if (x > 0) {
            if (this.state.currentGrid[y][x - 1].alive) neighboursCount++; //left
        }
        if (x < (this.state.widthCount - 1)) {
            if (this.state.currentGrid[y][x + 1].alive) neighboursCount++; //right
        }

        if (y < (this.state.heightCount - 1)) {
            if (x > 0) {
                if (this.state.currentGrid[y + 1][x - 1].alive) neighboursCount++; //bot-left
            }

            if (this.state.currentGrid[y + 1][x].alive) neighboursCount++; //bot

            if (x < (this.state.widthCount - 1)) {
                if (this.state.currentGrid[y + 1][x + 1].alive) neighboursCount++; //bot-right
            }
        }

        if (!cell.alive) { //if dead
            if (neighboursCount == 3) { //if should procreate
                cell.alive = true
                //console.log("x: " + x + " y: " + y + " ngb: " + neighboursCount + " should procreate")
                return cell
            }
            //console.log("x: " + x + " y: " + y + " ngb: " + neighboursCount + " stay dead")
            return cell //if not - stay dead
        }

        if (neighboursCount == 2 || neighboursCount == 3) { //if alive and has sufficient members
            //console.log("x: " + x + " y: " + y + " ngb: " + neighboursCount + " stay alive")
            return cell
        }
        cell.alive = false //overpop or starve - die
        //console.log("x: " + x + " y: " + y + " ngb: " + neighboursCount + " over or strv")
        return cell
    }

    componentDidMount() {
        let startGrid = []
        running = false

        for (let i = 0; i < this.state.heightCount; i++) {
            let tempRow = []
            for (let j = 0; j < this.state.widthCount; j++) {
                tempRow.push(new Cell(i, j))
            }
            startGrid.push(tempRow)
        }

        this.setState({
            currentGrid: startGrid,
            gen: 0,
            gridStyle: {
                display: "grid",
                height: "100%",
                width: "100%",
                gridTemplateColumns: "repeat(" + this.state.widthCount + ", 1fr)",
                gridTemplateRows: "repeat(" + this.state.heightCount + ", 1fr)"
            }
        })
    }

    componentDidUpdate() {
    }

    flattenArray() {
        //console.log("flattenArray")

        let flatArr = []
        if (!this.state.currentGrid[0]) {
            return;
        }
        for (let i = 0; i < this.state.heightCount; i++) {
            for (let j = 0; j < this.state.widthCount; j++) {
                flatArr.push(this.state.currentGrid[i][j].getDiv())
            }
        }
        //console.log(flatArr)
        return flatArr
    }

    render() {
        return (
            <div className="main-grid-wrap">
                <div className="main-grid" style={this.state.gridStyle} id="main-grid" onMouseDown={mouseDownGrid} onMouseUp={mouseUpGrid}>
                    {this.flattenArray()}
                </div>
                <div className="controls">
                    <button className="control-button" id="start-button" onClick={this.startStop}>start/pause</button>
                    <button className="control-button" id="reset-button" onClick={this.componentDidMount}>reset</button>
                    <h3 className="gen-count">Generation {this.state.gen}</h3>
                </div>
            </div>
        )
    }
}


ReactDOM.render(<MainGrid />, document.getElementById("wrapper"))