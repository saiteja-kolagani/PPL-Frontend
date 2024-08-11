import React from 'react';
import './App.css';
import TimeZoneConverter from './components/TimeZoneConverter/TimeZoneConverter';

function App() {
  return (
    <div>
      <header className="App-header">
        <h1>Time Zone Converter</h1>
      </header>
      <main>
        <TimeZoneConverter />
      </main>
    </div>
  );
}

export default App;
