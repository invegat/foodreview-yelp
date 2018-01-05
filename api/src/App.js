import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import YelpsContainer from './components/YelpsContainer';
import YelpContainer from './components/YelpContainer';


class App extends Component {
  render() {
    return (
     <div className="App">
        <Route exact path='/' component={YelpsContainer} />
        <Route path='/yelps/:id' component={YelpContainer} />
      </div>
    );
  }
}
export default App;
