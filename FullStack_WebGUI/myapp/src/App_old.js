import logo from './logo.svg';
import './App.css';
import Counter from './views/Counter';

function App() {
  return (
    <>

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span className="logo-title">REACT APP</span>
      </header>
    </div>
    <div className="counter-section">
      <Counter title="Counter Application"/>
    </div>

    </>
  );
}

export default App;
