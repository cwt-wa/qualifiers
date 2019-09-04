import React from 'react';
import './App.css';
import Login from "./Login";
import DrawOpponents from "./DrawOpponents";

function App() {
  return (
      <div>
        <h1>CWT Qualifiers</h1>
        <p>This is a tool to manage easy match-making for specifically for CWT qualifiers as it leverages the CWT 6
          API.</p>

        <Login/>
        <DrawOpponents/>
      </div>
  );
}

export default App;
