import React, { PureComponent } from 'react';

/* Pure Component => Uses shallow copy for should component update and calls it implicitly always*/
class PureCompo extends PureComponent {
  render() {
    console.log('Pure Value:::', this.props.value);
    return <div>Pure Component</div>;
  }
}

export default PureCompo;
