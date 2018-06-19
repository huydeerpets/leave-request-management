import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import signupReducer from './Reducers/signupReducer'
import loginReducer from './Reducers/loginReducer'
import adminReducer from './Reducers/adminReducer'
import leaveRequestReducer from './Reducers/leaveRequestReducer'
import fetchSupervisorReducer from './Reducers/fetchSupervisorReducer'


const appStore = combineReducers({
	signupReducer,
	loginReducer,
	adminReducer,
	leaveRequestReducer,
	fetchSupervisorReducer
})

const store = createStore(
	appStore,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunk)
)

export default store