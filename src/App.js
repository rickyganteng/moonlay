import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

import Planets from './page/planets';
import StarShip from './page/starship';
import People from './page/people';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              {/* <PublicRoute path='/' exact component={BasicReact} /> */}

              <Route path='/' exact component={Planets} />
              <Route path='/starship' exact component={StarShip} />
              <Route path='/people' exact component={People} />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
