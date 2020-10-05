import React, { Component } from 'react'
import './App.css';
import Counter from './Components/Counter';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parentCount: 0
    }
  }

  showCountInParent = (cnt) => {
    this.setState({ parentCount: cnt })
  }

  render() {
    return (
      <div className="container">
        <div>Click Pause button to access counter in parent Component : {this.state.parentCount}</div>
        <br/><br/>
        <Counter sendCounter={this.showCountInParent} />
      </div>
    )
  }
}