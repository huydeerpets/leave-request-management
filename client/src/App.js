import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';

import Landingpage from './components/Landingpage.jsx';
import Adminpage from './components/AdminPage.jsx';
import RegisterPage from './components/RegisterPage.jsx';

import LeaveRequestPage from './components/LeaveRequestPage.jsx';

import LandingEmployeePage from './components/LandingEmployeePage.jsx';
import EmployeeReqPendingPage from './components/EmployeeReqPendingPage.jsx';
import EmployeeReqAcceptPage from './components/EmployeeReqAcceptPage.jsx';
import EmployeeReqRejectPage from './components/EmployeeReqRejectPage.jsx';

import SupervisorLandingPage from './components/SupervisorLandingPage.jsx';
import SupervisorPendingPage from './components/SupervisorPendingPage.jsx';
import SupervisorAcceptPage from './components/SupervisorAcceptPage.jsx';
import SupervisorRejectPage from './components/SupervisorRejectPage.jsx';

import DirectorLandingPage from './components/DirectorLandingPage.jsx';
import DirectorPendingPage from './components/DirectorPendingPage.jsx';
import DirectorAcceptPage from './components/DirectorAcceptPage.jsx';
import DirectorRejectPage from './components/DirectorRejectPage.jsx';

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

              <Route path="/admin" component={Adminpage} />
              <Route exact path="/register" component={RegisterPage} />
              
              <Route path="/request-leave" component={LeaveRequestPage} />

              <Route path="/employee" component={LandingEmployeePage} />
              <Route path="/request-pending" component={EmployeeReqPendingPage} />
              <Route path="/request-accept" component={EmployeeReqAcceptPage} />
              <Route path="/request-reject" component={EmployeeReqRejectPage} />

              <Route path="/supervisor" component={SupervisorLandingPage} />
              <Route path="/list-request" component={SupervisorPendingPage} />
              <Route path="/list-accept" component={SupervisorAcceptPage} />
              <Route path="/list-reject" component={SupervisorRejectPage} />

              <Route path="/director" component={DirectorLandingPage} />
              <Route path="/list-pending-request" component={DirectorPendingPage} />
              <Route path="/list-accept-request" component={DirectorAcceptPage} />
              <Route path="/list-reject-request" component={DirectorRejectPage} />
              
              <Route component={Notfound} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}
export default App;
