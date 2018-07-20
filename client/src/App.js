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
import LeaveEditPage from './components/LeaveEditPage';
import ProfileEditPage from './components/ProfileEditPage';

import EmployeeLandingPage from './components/EmployeeLandingPage';
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
              <Route path="/register-user" component={RegisterPage} />            
              <Route path={`/edit-user/:id`} component={AdminEditPage}/>
              <Route path="/list-pending-request" component={AdminReqPendingPage} />
              <Route path="/list-approve-request" component={AdminReqAcceptPage} />              
              <Route path="/list-reject-request" component={AdminReqRejectPage} />
              
             
              <Route exact path="/profile" component={ProfileEditPage} />
              <Route exact path={`/profile/:id`} component={PasswordPage}/>

              <Route path="/employee" component={EmployeeLandingPage} />
              <Route path="/employee-leave-request" component={LeaveRequestPage} />                          
              <Route exact path={`/editrequest/:id`} component={LeaveEditPage}/>

              <Route path="/employee-request-pending" component={EmployeeReqPendingPage} />
              <Route path="/employee-request-approve" component={EmployeeReqAcceptPage} />
              <Route path="/employee-request-reject" component={EmployeeReqRejectPage} />


              <Route path="/supervisor" component={SupervisorLandingPage} />
              <Route path="/supervisor-pending-request" component={SupervisorPendingPage} />
              <Route path="/supervisor-approve-request" component={SupervisorAcceptPage} />
              <Route path="/supervisor-reject-request" component={SupervisorRejectPage} />


              <Route path="/director" component={DirectorLandingPage} />
              <Route path="/director-pending-request" component={DirectorPendingPage} />
              <Route path="/director-approve-request" component={DirectorAcceptPage} />
              <Route path="/director-reject-request" component={DirectorRejectPage} />
              
              <Route component={Notfound} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}
export default App;
