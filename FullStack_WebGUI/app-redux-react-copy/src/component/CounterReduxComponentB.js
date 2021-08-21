import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incCounterA } from '../actions/counterActions';

const CounterReduxComponentB = (props) => {
  const countBReduxStateValue = (state) => state.counterB.countB;
  const countB = useSelector(countBReduxStateValue);
  const countAReduxStateValue = (state) => state.counterA.countA;
  const countA = useSelector(countAReduxStateValue);

  const dispatch = useDispatch();

  const increaseA = () => dispatch(incCounterA(countA + 1));

  console.log(props);
  return (
    <>
      <p className="counter-title">Counter B</p>
      <p className="counter-value">{countB}</p>
      <button className="incbutton" onClick={increaseA}>
        Increase A
      </button>
    </>
  );
};

export default CounterReduxComponentB;
