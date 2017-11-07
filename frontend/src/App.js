import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './App.css';
import HomeIcon from 'react-icons/lib/fa/home';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Link className="appLink" to="/">
          <HomeIcon size={40}/>
        </Link>
      </div>
    );
  }
}

export default App;
