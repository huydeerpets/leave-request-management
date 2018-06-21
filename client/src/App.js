import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import Landingpage from './components/Landingpage.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import Adminpage from './components/AdminPage.jsx';

import LandingEmployee from './components/LandingEmployee';

import EmployeePage from './components/EmployeePage.jsx';

import ReqPendingPage from './components/ReqPendingPage.jsx';
import ReqAcceptPage from './components/ReqAcceptPage.jsx';
import ReqRejectPage from './components/ReqRejectPage.jsx';

import LandingSupervisor from './components/LandingSupervisor.jsx';
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
              
              <Route path="/request-leave" component={EmployeePage} />

              <Route path="/employee" component={LandingEmployee} />
              <Route path="/request-pending" component={ReqPendingPage} />
              <Route path="/request-accept" component={ReqAcceptPage} />
              <Route path="/request-reject" component={ReqRejectPage} />

              <Route path="/supervisor" component={LandingSupervisor} />
              <Route path="/list-request" component={SupervisorPage} />
              
              <Route component={Notfound} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}
export default App;
