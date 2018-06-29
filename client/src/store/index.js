import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux'
import thunk from 'redux-thunk';

import loginReducer from './Reducers/loginReducer'

import adminReducer from './Reducers/adminReducer'
import signupReducer from './Reducers/signupReducer'
import editUserReducer from './Reducers/editUserReducer'


import leaveRequestReducer from './Reducers/leaveRequestReducer'

import fetchEmployeeReducer from './Reducers/fetchEmployeeReducer'
import fetchSupervisorReducer from './Reducers/fetchSupervisorReducer'
import fetchDirectorReducer from './Reducers/fetchDirectorReducer'

const appStore = combineReducers({
	loginReducer,
	adminReducer,
	signupReducer,
	leaveRequestReducer,
	editUserReducer,

	fetchEmployeeReducer,
	fetchSupervisorReducer,
	fetchDirectorReducer,
})

const store = createStore(
	appStore,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunk)
)

export default store