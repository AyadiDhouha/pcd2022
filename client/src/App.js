 import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Header from './Components/Header/Header'
import MainPages from './pages/Pages'


function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
        
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;