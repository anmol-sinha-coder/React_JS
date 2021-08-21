import React, { Component } from 'react';

/* Normal React Component => should component update have to be called explicitly and if not called always 
return true */
class ReactCompo extends Component {
  render() {
    console.log('React Value:::', this.props.value);
    return <div>Normal React Component</div>;
  }
}

export default ReactCompo;
