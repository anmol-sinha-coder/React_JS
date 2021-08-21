import './App.css';
import Counter from './views/Counter';
import Navbarhoc from './views/Navbarhoc';
import CounterHooks from './views/CounterHooks';
import ReduxView from './views/ReduxView';

function App() {
  // Main View Container
  return (
    <>
      {/* React Fragment Also known as Tshirt Syntax => <></> ==> Since React only Allows you to return HTML
      Element encapsulated in a single tag like <div></div> */}
      {/* NavbarHoc  is a higher order component that takes any other component to make a uniform layout 
    for example here we are keeping the navbar in our app. The navbar hoc is unlike other component 
    where we use self closing instead here we use a proper opening and closing tag and the content inside the
    enclosure is called as children. */}
      {/* <Navbarhoc>
        <Counter title="Counter Application" />
      </Navbarhoc> */}
      {/* <CounterHooks title="Counter Application" /> */}
      <ReduxView />
    </>
  );
}

export default App;
