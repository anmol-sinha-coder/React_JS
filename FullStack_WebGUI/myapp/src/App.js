import logo from './logo.svg';
import './App.css';
/* import Counter from './views/Counter'; */
import CounterHooks from './views/CounterHooks';

function App() {
  // Main View Container
  return (
    <>
      {/* React Fragment Also known as Tshirt Syntax => <></> ==> Since React only Allows you to return HTML
      Element encapsulated in a single tag like <div></div> */}
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="logo-title">REACT APP</p>
        </header>
      </div>
      <div className="counter-section">
        <CounterHooks title="Counter Application" />
      </div>
    </>
  );
}

export default App;
