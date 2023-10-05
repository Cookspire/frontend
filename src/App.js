import logo from './logo.svg';
import './App.css';
import './environment/APIService'
import { URL } from './environment/APIService';

function App() {

  console.log("backend service"+URL.API_URL)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Cookspire</h1>
      </header>
    </div>
  );
}

export default App;
