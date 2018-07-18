import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux'
import thunk from 'redux-thunk';

import loginReducer from './Reducers/loginReducer'
import resetPasswordReducer from './Reducers/resetPasswordReducer'

import adminReducer from './Reducers/adminReducer'
import signupReducer from './Reducers/signupReducer'
import editUserReducer from './Reducers/editUserReducer'

import leaveRequestReducer from './Reducers/leaveRequestReducer'
import editRequestReducer from './Reducers/editRequestReducer'


import fetchDirectorReducer from './Reducers/fetchDirectorReducer'
import fetchSupervisorReducer from './Reducers/fetchSupervisorReducer'
import fetchEmployeeReducer from './Reducers/fetchEmployeeReducer'
import fetchUserSummaryReducer from './Reducers/fetchUserSummaryReducer'
import fetchUserTypeLeaveReducer from './Reducers/fetchUserTypeLeaveReducer'


import profileReducer from './Reducers/profileReducer'
import passwordReducer from './Reducers/passwordReducer'

import fetchTypeLeaveReducer from './Reducers/fetchTypeLeaveReducer'
import AddSupervisorReducer from './Reducers/AddSupervisorReducer'


const appStore = combineReducers({
	loginReducer,
	resetPasswordReducer,

	adminReducer,
	signupReducer,	
	editUserReducer,	
	
	profileReducer,	
	AddSupervisorReducer,	

	leaveRequestReducer,
	editRequestReducer,	

	fetchDirectorReducer,
	fetchSupervisorReducer,	
	fetchEmployeeReducer,

	fetchUserSummaryReducer,
	fetchUserTypeLeaveReducer,
	
	passwordReducer,
	fetchTypeLeaveReducer,
	
})

const store = createStore(
	appStore,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunk)
)
export default store