import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import signupReducer from './Reducers/signupReducer'
import loginReducer from './Reducers/loginReducer'
import adminReducer from './Reducers/adminReducer'
import leaveRequestReducer from './Reducers/leaveRequestReducer'
import fetchSupervisorReducer from './Reducers/fetchSupervisorReducer'
import fetchReqPendingReducer from './Reducers/statusPendingReducer'
import fetchReqAcceptReducer from './Reducers/statusAcceptReducer'
import fetchReqRejectReducer from './Reducers/statusRejectReducer'

const appStore = combineReducers({
	signupReducer,
	loginReducer,
	adminReducer,
	leaveRequestReducer,
	fetchSupervisorReducer,
	fetchReqPendingReducer,
	fetchReqAcceptReducer,
	fetchReqRejectReducer
})

const store = createStore(
	appStore,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunk)
)

export default store