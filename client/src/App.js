import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Loginpage from './components/Loginpage';
import ResetPasswordPage from './components/ResetPasswordPage';

import Adminpage from './components/AdminPage';
import RegisterPage from './components/RegisterPage';
import AdminReqPendingPage from './components/AdminReqPendingPage';
import AdminReqAcceptPage from './components/AdminReqAcceptPage';
import AdminReqRejectPage from './components/AdminReqRejectPage';
import AdminEditPage from './components/AdminEditPage';

import LeaveRequestPage from './components/LeaveRequestPage';
import LeaveRequestSupervisorPage from './components/LeaveRequestSupervisorPage';
import LeaveEditPage from './components/LeaveEditPage';
import ProfileEditPage from './components/ProfileEditPage';

import LandingEmployeePage from './components/LandingEmployeePage';
import EmployeeReqPendingPage from './components/EmployeeReqPendingPage';
import EmployeeReqAcceptPage from './components/EmployeeReqAcceptPage';
import EmployeeReqRejectPage from './components/EmployeeReqRejectPage';

import SupervisorLandingPage from './components/SupervisorLandingPage';
import SupervisorPendingPage from './components/SupervisorPendingPage';
import SupervisorAcceptPage from './components/SupervisorAcceptPage';
import SupervisorRejectPage from './components/SupervisorRejectPage';

import DirectorLandingPage from './components/DirectorLandingPage';
import DirectorPendingPage from './components/DirectorPendingPage';
import DirectorAcceptPage from './components/DirectorAcceptPage';
import DirectorRejectPage from './components/DirectorRejectPage';

import PasswordPage from './components/PasswordPage';
import Notfound from './components/NotFound';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Loginpage} />
              <Route exact path="/login" component={Loginpage} />
              <Route exact path="/reset-password" component={ResetPasswordPage} />


              <Route path="/admin" component={Adminpage} />
              <Route exact path="/register" component={RegisterPage} />            
              <Route path="/list-request-pending" component={AdminReqPendingPage} />
              <Route path="/list-request-accept" component={AdminReqAcceptPage} />              
              <Route path="/list-request-reject" component={AdminReqRejectPage} />
              <Route path={`/edituser/:id`} component={AdminEditPage}/>


              <Route path="/request-leave" component={LeaveRequestPage} />
              <Route path="/supervisor-request-leave" component={LeaveRequestSupervisorPage} />


              <Route path="/employee" component={LandingEmployeePage} />
              <Route path={`/editrequest/:id`} component={LeaveEditPage}/>
              <Route exact path={`/profile/:id`} component={PasswordPage}/>
              <Route exact path="/profile" component={ProfileEditPage} />


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
