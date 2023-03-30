import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sandbox from './sandbox/sandbox';
import { AuthProvider } from './spotify/context';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <header className="App-header">
          <Sandbox />
        </header>
      </div>
    </AuthProvider>
  );
}

export default App;
