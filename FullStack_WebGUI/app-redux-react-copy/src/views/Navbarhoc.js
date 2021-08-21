import React from 'react';
import logo from '../logo.svg';

const Navbarhoc = (props) => {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="logo-title">REACT APP</p>
        </header>
      </div>
      {/* props.children gives the html node that is encapsulated between the opening and closing tags
      of this component */}
      <div className="counter-section">{props.children}</div>
    </>
  );
};

export default Navbarhoc;
