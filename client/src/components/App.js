import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// important components
import Homepage from '../containers/DeckTool';
import Deck from '../containers/Deck';

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/deck/:id' component={Deck} />
          <Route component={NoMatch}/>
        </Switch>
      </Router>
    );
  }
}

export default App;