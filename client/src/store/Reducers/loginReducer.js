const loginForm = {
	email: '',
	password: ''
}

export default function loginReducer (state = loginForm, action) {
	switch (action.type) {
		case 'LOGIN_FORM_ONCHANGE':
			return {
				...action.payload
			}
		case 'FIELD_CLEAR': 
			return {
				...loginForm
			}
		default:
			return state
	}
}