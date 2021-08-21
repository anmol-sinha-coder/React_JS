import React from 'react';
import CounterReduxComponentA from '../component/CounterReduxComponentA';
import CounterReduxComponentB from '../component/CounterReduxComponentB';

const ReduxView = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 bg-yellow txt-dark">
          <CounterReduxComponentA />
        </div>
        <div className="col-6 txt-yellow">
          <CounterReduxComponentB />
        </div>
      </div>
    </div>
  );
};

export default ReduxView;
