import React from 'react';

const CustomButton = (props) => {
  // const { propsFunc, propsName } = props;
  return (
    <button className="new-button" onClick={props.propsFunc}>
      {props.propsName}
    </button>
  );
};

export default CustomButton;