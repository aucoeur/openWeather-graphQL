import './App.css';
import Weather from './components/Weather'

import Sun from './assets/sun.svg';
function App() {
  return (
    <div className="App">
      <img src={Sun} className="App-logo" alt="logo" />
        <Weather />
    </div>
  );
}

export default App;
