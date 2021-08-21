import React from 'react';
import CustomButtom from '../utility/component/CustomButtom';

const CounterHooks = ({ title }) => {
  // Use State
  const [count, setCount] = React.useState(5); // => returns  [  getterValue, setterFunction(setterValue) ] , takes (initial value)

  // Use Effect (arrow function => Callback function, dependency array optional)
  /* React.useEffect(() => {
  }, []); */

  // Case 1: This run on mount as well as for state changes => Without Dependency Array
  React.useEffect(() => {
    console.log('Case 1:', count);
  }); // Console.log

  // Case 2: Dependency Array Empty => Only Mount
  React.useEffect(() => {
    console.log('Case 2:', count);
  }, []); // Mainly used initial conditional update or API Fetch

  // Case 3: Dependency Array with some dependency states => behaves like Did Update
  React.useEffect(() => {
    console.log('Case 3:', count * 2);
  }, [count]); // Prev count and current if diff then execute inside
  // In between UI Rerender Conditional logical updates on state

  // Case 4: Use call back return func inside => Will Unmount
  React.useEffect(() => {
    return () => {
      console.log('Case 3:', count);
    };
  }, []); // Prev count and current if diff then execute inside
  // Cleanup and garbage collection

  // A single component Can Have multiple Use Effect

  // useRef case 1: Mutable State without Rerender
  const countRef = React.useRef(0);
  // useRef case 2: Getting virtual dom elements substitute for document.getElement......
  const devRef = React.useRef(null);

  const incByOne = () => {
    countRef.current++;
    console.log('Ref', countRef);
    // devRef.current.innerHTML = 'Hello';
  };

  const myFun = () => {
    setCount(count + 1);
  };

  console.log('Element Ref', devRef);

  return (
    <div className="counter-view">
      <div className="display-value"> {title} </div>
      <div className="display-value">{countRef.current}</div>
      <CustomButtom //Component - Independent Childs
        propsName="Increase by 1"
        propsFunc={incByOne} // How to change => Function - optional
        value={count} // To be changed - optional
      />
      <button ref={devRef} onClick={myFun}>
        ReRender UI by Upating Count State
      </button>
    </div>
  );
};

export default CounterHooks;
