import React from 'react';

const Counterhoc = (props) => {
  return (
    <div className="counter-view">
      <div className="display-value"> {props.title} </div>
      <div className="display-value"> Parent => {props.x} </div>
      {props.children}
    </div>
  );
};

export default Counterhoc;
