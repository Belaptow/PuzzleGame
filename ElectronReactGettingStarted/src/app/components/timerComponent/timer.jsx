import * as ReactDOM from 'react-dom';
import * as React from 'react';

require('./accurateInterval.js')

require("./timer.css")

class RootComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            minutes: "25",
            seconds: "00",
            buttonString: "START",
            counting: false,
            resetPressed: false,
            breakOrSession: "Session",
            intervalId: ''
        };

        this.handleIncrement = this.handleIncrement.bind(this);
        this.handleDecrement = this.handleDecrement.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.counting = this.counting.bind(this);
        this.handleTimer = this.handleTimer.bind(this);
    }

    counting() {
        let minutes = this.state.minutes.split("");
        let seconds = this.state.seconds.split("");
        if (seconds.length == 1) {
            seconds.unshift("0");
        }
        if (minutes.length == 1) {
            seconds.unshift("0");
        }
        //console.log(minutes)
        //console.log(seconds)
        //console.log(this.state.seconds)
        if (seconds[1] == 0) {
            if (seconds[0] == 0) {
                if (minutes[1] == 0) {
                    if (minutes[0] == 0) {
                        if (this.state.breakOrSession == "Session") {
                            if (this.state.breakLength < 10) {
                                this.setState({
                                    minutes: "0" + this.state.breakLength,
                                    seconds: "00",
                                    breakOrSession: "Break",
                                    counting: true,
                                    buttonString: "STOP"
                                });
                                //console.log(this.state.seconds)
                            } else {
                                this.setState({
                                    minutes: "" + this.state.breakLength,
                                    seconds: "00",
                                    breakOrSession: "Break",
                                    counting: true,
                                    buttonString: "STOP"
                                });
                                //console.log(this.state.seconds)
                            }
                        } else {
                            if (this.state.sessionLength < 10) {
                                this.setState({
                                    minutes: "0" + this.state.sessionLength,
                                    seconds: "00",
                                    breakOrSession: "Session",
                                    counting: true,
                                    buttonString: "STOP"
                                });
                                //console.log(this.state.seconds)
                            } else {
                                this.setState({
                                    minutes: "" + this.state.sessionLength,
                                    seconds: "00",
                                    breakOrSession: "Session",
                                    counting: true,
                                    buttonString: "STOP"
                                });
                                //console.log(this.state.seconds)
                            }
                        }
                    } else {
                        this.setState({
                            seconds: "59",
                            minutes: '' + (minutes[0] - 1) + "9",
                            counting: true,
                            buttonString: "STOP"
                        });
                        console.log(this.state.seconds)
                    }
                } else {
                    this.setState({
                        seconds: "59",
                        minutes: "" + (minutes[0]) + "" + (minutes[1] - 1) + "",
                        counting: true,
                        buttonString: "STOP"
                    });
                    //console.log(this.state.seconds + "min1" + this.state.counting)
                }
            } else {
                this.setState({
                    seconds: "" + (seconds[0] - 1) + "9",
                    counting: true,
                    buttonString: "STOP"
                });
                //console.log(this.state.seconds + "sec0")
            }
        } else {
            //console.log(seconds[0]);
            this.setState({
                seconds: "" + (seconds[0]) + "" + (seconds[1] - 1) + "",
                counting: true,
                buttonString: "STOP"
            });
            //console.log(this.state.seconds + "sec1" + this.state.counting)
        }
    }
    handleTimer() {
        //console.log(this.state.counting);
        if (this.state.counting) {
            this.state.intervalId.cancel();
            this.setState({
                counting: false,
                buttonString: "START"
            });

        } else {
            this.setState({
                intervalId: accurateInterval(this.counting, 1000)
            });

        }
    }
    handleReset() {
        if (this.state.intervalId != "") {
            this.state.intervalId.cancel();
        }

        this.setState({
            breakLength: 5,
            sessionLength: 25,
            minutes: "25",
            seconds: "00",
            buttonString: "START",
            counting: false,
            breakOrSession: "Session",
            resetPressed: false
        });
    }
    handleIncrement(e) {
        switch (e.target.value) {
            case "break":
                if (this.state.breakLength < 60) {
                    this.setState({
                        breakLength: this.state.breakLength + 1
                    });
                }
                break;
            case "session":
                if (this.state.sessionLength < 60) {
                    if (this.state.sessionLength + 1 < 10) {
                        let tempNum = Number(this.state.minutes) + 1;
                        this.setState({
                            sessionLength: this.state.sessionLength + 1,
                            minutes: '0' + tempNum
                        });
                    } else {
                        let tempNum = Number(this.state.minutes) + 1;
                        this.setState({
                            sessionLength: this.state.sessionLength + 1,
                            minutes: '' + tempNum
                        });
                    }
                }
                break;
        }
    }
    handleDecrement(e) {
        switch (e.target.value) {
            case "break":
                if (this.state.breakLength > 1) {
                    this.setState({
                        breakLength: this.state.breakLength - 1
                    });
                }
                break;
            case "session":
                if (this.state.sessionLength > 1) {
                    if (this.state.sessionLength - 1 < 10) {
                        let tempNum = Number(this.state.minutes) - 1;
                        this.setState({
                            sessionLength: this.state.sessionLength - 1,
                            minutes: '0' + tempNum
                        });
                    } else {
                        let tempNum = Number(this.state.minutes) - 1;
                        this.setState({
                            sessionLength: this.state.sessionLength - 1,
                            minutes: '' + tempNum
                        });
                    }
                }
                break;
        }
    }
    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="top">
                        <div className="breakContainer">
                            <div className="label break-label" id="break-label">
                                Break Length
              </div>
                            <div className="buttonsContainer">
                                <button
                                    className="buttons break-increment"
                                    id="break-increment"
                                    value="break"
                                    onClick={this.handleIncrement}
                                >
                                    &uarr;
                </button>
                                <div className="label break-length" id="break-length">
                                    {this.state.breakLength}
                                </div>
                                <button
                                    className="buttons break-decrement"
                                    id="break-decrement"
                                    value="break"
                                    onClick={this.handleDecrement}
                                >
                                    &darr;
                </button>
                            </div>
                        </div>
                        <div className="sessionContainer">
                            <div className="label session-label" id="session-label">
                                Session Length
              </div>
                            <div className="buttonsContainer">
                                <button
                                    className="buttons session-increment"
                                    id="session-increment"
                                    value="session"
                                    onClick={this.handleIncrement}
                                >
                                    &uarr;
                </button>
                                <div className="label session-length" id="session-length">
                                    {this.state.sessionLength}
                                </div>
                                <button
                                    className="buttons session-decrement"
                                    id="session-decrement"
                                    value="session"
                                    onClick={this.handleDecrement}
                                >
                                    &darr;
                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bot">
                        <div className="timerWrapper">
                            <div className="label timer-label" id="timer-label">
                                {this.state.breakOrSession}
                            </div>
                            <div className="time-left" id="time-left">
                                {this.state.minutes}:{this.state.seconds}
                            </div>
                        </div>
                        <div className="buttonsContainer controls">
                            <button className="buttonsControls start-stop" id="start_stop" onClick={this.handleTimer}>
                                {this.state.buttonString}
                            </button>
                            <button
                                className="buttonsControls reset"
                                id="reset"
                                onClick={this.handleReset}
                            >
                                RESET
              </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<RootComponent />, document.getElementById("body"));