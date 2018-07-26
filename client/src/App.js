import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import LoginPage from './components/LoginPage';
import ResetPasswordPage from './components/ResetPasswordPage';

import AdminLandingPage from './components/AdminLandingPage';
import RegisterPage from './components/RegisterPage';
import AdminEditPage from './components/AdminEditPage';
import AdminPendingPage from './components/AdminPendingPage';
import AdminApprovePage from './components/AdminApprovePage';
import AdminRejectPage from './components/AdminRejectPage';


import EmployeeLandingPage from './components/EmployeeLandingPage';
import ProfilePage from './components/ProfilePage';
import PasswordPage from './components/PasswordPage';

import LeaveRequestPage from './components/LeaveRequestPage';
import LeaveEditPage from './components/LeaveEditPage';
import EmployeePendingPage from './components/EmployeePendingPage';
import EmployeeApprovePage from './components/EmployeeApprovePage';
import EmployeeRejectPage from './components/EmployeeRejectPage';


import SupervisorLandingPage from './components/SupervisorLandingPage';
import SupervisorPendingPage from './components/SupervisorPendingPage';
import SupervisorApprovePage from './components/SupervisorApprovePage';
import SupervisorRejectPage from './components/SupervisorRejectPage';


import DirectorLandingPage from './components/DirectorLandingPage';
import DirectorPendingPage from './components/DirectorPendingPage';
import DirectorApprovePage from './components/DirectorApprovePage';
import DirectorRejectPage from './components/DirectorRejectPage';

import Notfound from './components/NotFound';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/reset-password" component={ResetPasswordPage} />


              <Route path="/admin" component={AdminLandingPage} />
              <Route path="/register-user" component={RegisterPage} />            
              <Route path={`/edit-user/:id`} component={AdminEditPage}/>
              <Route path="/list-pending-request" component={AdminPendingPage} />
              <Route path="/list-approve-request" component={AdminApprovePage} />              
              <Route path="/list-reject-request" component={AdminRejectPage} />              
                           

              <Route path="/employee" component={EmployeeLandingPage} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path={`/profile/:id`} component={PasswordPage}/>

              <Route path="/employee-leave-request" component={LeaveRequestPage} />                          
              <Route exact path={`/editrequest/:id`} component={LeaveEditPage}/>
              <Route path="/employee-request-pending" component={EmployeePendingPage} />
              <Route path="/employee-request-approve" component={EmployeeApprovePage} />
              <Route path="/employee-request-reject" component={EmployeeRejectPage} />


              <Route path="/supervisor" component={SupervisorLandingPage} />
              <Route path="/supervisor-pending-request" component={SupervisorPendingPage} />
              <Route path="/supervisor-approve-request" component={SupervisorApprovePage} />
              <Route path="/supervisor-reject-request" component={SupervisorRejectPage} />


              <Route path="/director" component={DirectorLandingPage} />
              <Route path="/director-pending-request" component={DirectorPendingPage} />
              <Route path="/director-approve-request" component={DirectorApprovePage} />
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
