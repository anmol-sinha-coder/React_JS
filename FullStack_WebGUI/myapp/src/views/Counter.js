import React, { Component } from 'react';
import CustomButtom from '../utility_component/CustomButton';

class Counter extends Component {
  //Parent
  constructor(props) {
    super(props);
    this.state = {
      x: 0, // State, Gives two things => value=> this.state.x & Function => this.setState({})
    };

    // In order to overcome HOISTING we bind the function prototype to this scope of this class
    // ** Not Required for arrow functions
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

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
      <div>
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
      </div>
    );
  }
}

export default Counter;