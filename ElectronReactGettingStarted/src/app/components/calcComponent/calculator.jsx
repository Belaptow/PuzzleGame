import * as ReactDOM from 'react-dom';
import * as React from 'react';
require('./calculator.css')

class RootComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentVal: 0,
            prevVal: 0,
            display: "0",
            form: "",
            decPressed: false
        };
        this.handleNumber = this.handleNumber.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleOperate = this.handleOperate.bind(this);
        this.handleEqual = this.handleEqual.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
    }
    handleDecimal() {
        let regExp = /[/*+.-]$/g;
        if (regExp.test(this.state.form) != true && this.state.decPressed != true) {
            //console.log("pokeDec");
            this.setState({
                form: this.state.form + ".",
                display: this.state.display + ".",
                decPressed: true
            });
        }
    }
    handleEqual() {
        if (this.state.form != "") {
            let regExp = /[/*+-]$/g;
            let resArr = this.state.form.split("");
            while (regExp.test(resArr[resArr.length - 1])) {
                console.log(regExp.test(resArr[resArr.length - 1]));
                resArr.splice(resArr.length - 1, 1);
            }
            let tempStr = resArr.join("");

            let res = Number(eval(tempStr).toFixed(4));
            let resStr = '' + res;
            //console.log(res);
            this.setState({
                form: resStr,
                display: resStr,
                decPressed: false
            });
        }
        //console.log(eval(tempStr));

    }
    handleOperate(e) {
        let regExp = /[/*+.-]$/g;
        let regExpMinus = /-$/g;
        //console.log(regexOp.test(this.state.form));
        let tempArr = this.state.form.split("");
        //console.log(tempArr)
        if (this.state.form != "") {
            switch (tempArr[tempArr.length - 1]) {
                case "*":
                case "-":
                case "+":
                case "/":
                case ".":
                    while (regExp.test(tempArr[tempArr.length - 1])) {
                        console.log(regExp.test(tempArr[tempArr.length - 1]));
                        tempArr.splice(tempArr.length - 1, 1);
                    }
                    let tempStr = tempArr.join("");
                    //console.log(tempStr);
                    tempArr = this.state.form.split("");
                    switch (e.target.value) {
                        case "x":
                            this.setState({
                                display: "X",
                                form: tempStr + "*",
                                decPressed: false
                            });
                            //console.log("poke");
                            break;
                        case "+":
                            this.setState({
                                display: "+",
                                form: tempStr + "+",
                                decPressed: false
                            });
                            break;
                        case "-":
                            if (tempArr[tempArr.length - 1] != '-') {
                                this.setState({
                                    display: "-",
                                    form: this.state.form + "-",
                                    decPressed: false
                                });
                                break;
                            } else {
                                this.setState({
                                    display: "-",
                                    form: tempStr + "-",
                                    decPressed: false
                                });
                                break;
                            }
                        case "/":
                            this.setState({
                                display: "/",
                                form: tempStr + "/",
                                decPressed: false
                            });
                            break;
                    }
                    break;
                default:
                    switch (e.target.value) {
                        case "x":
                            this.setState({
                                display: "X",
                                form: this.state.form + "*",
                                decPressed: false
                            });
                            //console.log("default-poke");
                            break;
                        case "+":
                            this.setState({
                                display: "+",
                                form: this.state.form + "+",
                                decPressed: false
                            });
                            break;
                        case "-":
                            this.setState({
                                display: "-",
                                form: this.state.form + "-",
                                decPressed: false
                            });
                            break;
                        case "/":
                            this.setState({
                                display: "/",
                                form: this.state.form + "/",
                                decPressed: false
                            });
                            break;
                    }
                    break;
            }
        }
    }
    handleClear() {
        this.setState({
            display: "0",
            form: "",
            decPressed: false
        });
        //console.log(this.state)
    }
    handleNumber(e) {
        switch (this.state.display) {
            case "X":
            case "/":
            case "+":
            case "-":
                this.setState({
                    display: "" + e.target.value,
                    form: this.state.form + e.target.value
                });
                break;
            case "0":
                //console.log("poke");
                this.setState({
                    display: e.target.value,
                    form: e.target.value
                });
                break;
            default:
                this.setState({
                    display: this.state.display + e.target.value,
                    form: this.state.form + e.target.value
                });
        }

        //console.log(this.state)
    }

    render() {
        return (
            <div>
                <div className="wrapper" id="wrapper">
                    <div className="calc-top" id="calc-top">
                        <div className="input" id="input">
                            <div className="form" id="form">
                                {this.state.form}
                            </div>

                            <div className="display" id="display">
                                {this.state.display}
                            </div>
                        </div>
                    </div>
                    <div className="calc-bottom" id="calc-bottom">
                        <button
                            className="buttons equals"
                            id="equals"
                            value="="
                            onClick={this.handleEqual}
                        >
                            =
            </button>
                        <button
                            className="buttons zero"
                            id="zero"
                            value="0"
                            onClick={this.handleNumber}
                        >
                            0
            </button>
                        <button
                            className="round buttons one"
                            id="one"
                            value="1"
                            onClick={this.handleNumber}
                        >
                            1
            </button>
                        <button
                            className="round buttons two"
                            id="two"
                            value="2"
                            onClick={this.handleNumber}
                        >
                            2
            </button>
                        <button
                            className="round buttons three"
                            id="three"
                            value="3"
                            onClick={this.handleNumber}
                        >
                            3
            </button>
                        <button
                            className="round buttons four"
                            id="four"
                            value="4"
                            onClick={this.handleNumber}
                        >
                            4
            </button>
                        <button
                            className="round buttons five"
                            id="five"
                            value="5"
                            onClick={this.handleNumber}
                        >
                            5
            </button>
                        <button
                            className="round buttons six"
                            id="six"
                            value="6"
                            onClick={this.handleNumber}
                        >
                            6
            </button>
                        <button
                            className="round buttons seven"
                            id="seven"
                            value="7"
                            onClick={this.handleNumber}
                        >
                            7
            </button>
                        <button
                            className="round buttons eight"
                            id="eight"
                            value="8"
                            onClick={this.handleNumber}
                        >
                            8
            </button>
                        <button
                            className="round buttons nine"
                            id="nine"
                            value="9"
                            onClick={this.handleNumber}
                        >
                            9
            </button>
                        <button
                            className="buttons add"
                            id="add"
                            value="+"
                            onClick={this.handleOperate}
                        >
                            +
            </button>
                        <button
                            className="buttons subtract"
                            id="subtract"
                            value="-"
                            onClick={this.handleOperate}
                        >
                            -
            </button>
                        <button
                            className="buttons multiply"
                            id="multiply"
                            value="x"
                            onClick={this.handleOperate}
                        >
                            x
            </button>
                        <button
                            className="buttons divide"
                            id="divide"
                            value="/"
                            onClick={this.handleOperate}
                        >
                            /
            </button>
                        <button className="buttons decimal" id="decimal" value="." onClick={this.handleDecimal}>
                            .
            </button>
                        <button
                            className="buttons clear"
                            id="clear"
                            value="AC"
                            onClick={this.handleClear}
                        >
                            AC
            </button>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<RootComponent />, document.getElementById("body"));
