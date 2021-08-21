import React from 'react';
import { connect } from 'react-redux';
import { incCounterB } from '../actions/counterActions';

const CounterReduxComponentA = (props) => {
  console.log('Props: ', props);
  return (
    <>
      <p className="counter-title">Counter A</p>
      <p className="counter-value">{props.countA}</p>
      <button
        className="incbutton"
        onClick={() => props.incB(props.countB + 1)}
      >
        Increase B
      </button>
    </>
  );
};

const mapStateToProps = (state) => ({
  countA: state.counterA.countA,
  countB: state.counterB.countB,
});

const mapDispatchToProps = (dispatch) => ({
  incB: (data) => dispatch(incCounterB(data)), //action + dispatcher => function
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterReduxComponentA);

/* 
connect(mapStateToProps,func2){

    // func1(state)
     state = {
  counterA: CountAReducer,
  counterB: CountAReducer,
} 
state.counterA.countA
    mapStateToProps(state) => Return value bind props

} */
