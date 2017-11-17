import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// important components
import Homepage from '../containers/DeckTool';
import Deck from '../containers/Deck';
import NotFound from '../components/NotFound'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/deck/:id' component={Deck} />
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;