import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Search from './components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Route path="/" component={Search}/>
    </Router>
  );
}

export default App;
