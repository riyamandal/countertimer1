import React, { Component } from 'react'

export default class Counter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            time: 0,
            start: 1,
            isOn: false,
            counterIncrementBy: 1,
            counterSeconds: 1
        }
    }

    startTimer = () => {
        console.log(typeof (this.state.counterIncrementBy));
        this.setState({
            isOn: true,
            time: this.state.start
        })
        this.timer = setInterval(() => this.setState({
            time: this.state.time + parseInt(this.state.counterIncrementBy)
        }), (this.state.counterSeconds * 1000))
        console.log("start")
    }
    pauseTimer = () => {
        this.setState({ isOn: false, start: this.state.time })
        clearInterval(this.timer)
        console.log("pause")
        this.props.sendCounter(this.state.time)
    }
    resetTimer = () => {
        this.setState({ time: 0, start: 1, counterSeconds: 1, counterIncrementBy: 1 })
        console.log("reset")
    }
    startChangeHandler = (e) => {
        let { value } = e.target;
        this.setState({ start: value })
    }
    counterIncrementByChangeHandler = (e) => {
        let { value } = e.target;
        this.setState({ counterIncrementBy: value, isOn: false, start: this.state.time || 1 })
        clearInterval(this.timer)
    }
    secondsChangeHandler = (e) => {
        let { value } = e.target;
        this.setState({ counterSeconds: value, isOn: false, start: this.state.time })
        clearInterval(this.timer)
    }
    render() {
        let start = (this.state.time === 0) ?
            <button type="button" className="btn btn-primary btn-sm" onClick={this.startTimer}>Start</button> :
            null
        let pause = (this.state.isOn) ?
            <button type="button" className="btn btn-secondary btn-sm" onClick={this.pauseTimer}>Pause</button> :
            null
        let reset = (this.state.time !== 0 && !this.state.isOn) ?
            <button type="button" className="btn btn-secondary btn-sm" onClick={this.resetTimer}>Reset</button> :
            null
        let resume = (this.state.time !== 0 && !this.state.isOn) ?
            <button type="button" className="btn btn-primary btn-sm" onClick={this.startTimer}>Resume</button> :
            null
        return (
            <form className="container">
                <div className="form-group row">
                    <label htmlFor="start" className="col-sm-5 col-form-label">Initial value of counter : </label>
                    <div className="col-sm-2">
                        <input type="number" className="form-control" name="start" value={this.state.start} onChange={this.startChangeHandler} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="counterIncrementBy" className="col-sm-5 col-form-label">Increment counter by : </label>
                    <div className="col-sm-2">
                        <input type="number" className="form-control" value={this.state.counterIncrementBy} name="counterIncrementBy" onChange={this.counterIncrementByChangeHandler} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="seconds" className="col-sm-5 col-form-label">Increment it in Seconds: </label>
                    <div className="col-sm-2">
                        <input type="number" className="form-control" name="seconds" value={this.state.counterSeconds} onChange={this.secondsChangeHandler} size="4" />
                    </div>
                </div>
                <h3>Timer: {this.state.time}</h3>
                {start}
                {resume}
                {pause}
                {reset}
            </form>
        )
    }
}