import React, { Component } from 'react';
import CustomButtom from '../utility/component/CustomButtom';
import PureCompo from '../component/PureCompo';
import ReactCompo from '../component/ReactCompo';

class Counter extends Component {
  //Parent
  constructor(props) {
    super(props);
    this.state = {
      x: 0, // State, Gives two things => value=> this.state.x & Function => this.setState({})
      updateNum: 0,
    };

    // In order to overcome HOISTING we bind the function prototype to this scope of this class
    // ** Not Required for arrow functions
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  componentDidMount() {
    // Just Before the Race Starts
    this.setState({
      x: 0,
    });
  }

  componentDidUpdate() {
    // Repeatedly Called During the Race
    /* if (this.state.x === 2)
      this.setState({
        x: 3,
      }); */
    // Uncomment this and comment the above to see pure vs react component in console
    /*  setInterval(() => {
      this.setState({
        updateNum: 0,
      });
    }, 1000); */
  }

  componentWillUnmount() {
    // Just Before reaching the finishing line or component removal
    // Garbage Collection
  }

  // Uncomment This to see how shouldComponentUpdate works
  // Return true or false => if true UI will rerender / if false UI will not re render
  /*  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.state.x, nextState.x);
    return this.state.x !== nextState.x;
  } */

  increase() {
    // increament X here
    //this.state.x+=1 is not the approach
    // setState is used to update the states
    this.setState({
      x: this.state.x + 1,
    });
  }
  decrease() {
    // Functions are used to give the permissions and instructions to perform to child
    // in order to change parent states.
    // Functions can also be used for various purposes
    // Decreament X here
    this.setState({
      x: this.state.x - 1,
    });
  }

  // Render returns the UI view of the component
  render() {
    return (
      <div className="counter-view">
        <div className="display-value"> {this.props.title} </div>
        <div className="display-value"> Parent => {this.state.x} </div>
        {/* <button onClick={this.increase}>Increase By 1</button>
        <button onClick={this.decrease}>Decrease By 1</button> */}
        {/* Use Custom Component Instead */}
        <CustomButtom //Component - Independent Childs
          propsName="Increase By 1"
          propsFunc={this.increase}
          value={this.state.x}
        />
        <CustomButtom //Component - Independent Childs
          propsName="Decrease By 1"
          propsFunc={this.decrease} // How to change => Function - optional
          value={this.state.x} // To be changed - optional
        />
        <div className="component-container">
          <PureCompo value={this.state.updateNum} />
          <ReactCompo value={this.state.updateNum} />
        </div>
      </div>
    );
  }
}

export default Counter;
