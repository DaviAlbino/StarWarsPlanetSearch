import React from 'react';
import './App.css';
import NameInput from './components/NameInput';
import Table from './components/Table';

function App() {
  return (
    <div>
      <span>Hello, App!!</span>
      <main>
        <NameInput />
        <Table />
      </main>
    </div>
  );
}

export default App;
