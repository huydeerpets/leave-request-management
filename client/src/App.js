import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import Landingpage from './components/Landingpage.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import Adminpage from './components/AdminPage.jsx';
import EmployeePage from './components/EmployeePage.jsx';
import SupervisorPage from './components/SupervisorPage.jsx';
import Notfound from './components/NotFound.jsx';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Landingpage} />
              <Route exact path="/login" component={Landingpage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route path="/admin" component={Adminpage} />
              <Route path="/employee" component={EmployeePage} />
              <Route path="/supervisor" component={SupervisorPage} />
              <Route component={Notfound} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}
export default App;
