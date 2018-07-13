const loginForm = {
	login: {
		email: '',
		password: ''
	},	
	message : "",
	is_error : false
		
}

export default function loginReducer(state = loginForm, action) {
	switch (action.type) {
		case 'LOGIN_FORM_ONCHANGE':
			return {
				...state,
				login: action.payload
			}
		case 'FIELD_CLEAR':
			return {
				...loginForm,
			}
		case 'HANDLE_ERROR':
			return {				
				...loginForm,
				...action.payload				
			}
		default:
			return state
	}
}