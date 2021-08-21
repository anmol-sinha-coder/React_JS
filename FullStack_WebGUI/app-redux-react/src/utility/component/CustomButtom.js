import React from 'react';

const CustomButtom = (props) => {
  // const { propsFunc, propsName } = props;
  return (
    <button className="new-button" onClick={props.propsFunc}>
      {props.propsName} Child=>{props.value}
    </button>
  );
};

export default CustomButtom;
