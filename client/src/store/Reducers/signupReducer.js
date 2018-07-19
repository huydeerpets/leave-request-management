function makeid() {
	var text = "";
	var possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?";

	for (var i = 0; i < 7; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

const SignUp = {
	user: {
		employee_number: '',
		name: '',
		gender: '',
		position: '',
		start_working_date: '',
		mobile_phone: '',
		email: '',
		password: makeid(),
		role: '',
		supervisor_id: null
	},
	error: {},
}


const SignupReducer = (state = SignUp, action) => {
	switch (action.type) {
		case 'SIGNUP_USER':
			return {
				...state,
				user: action.payload
			}
		case 'CLEAR_FIELD':
			return {
				...state,
			}
		case 'HANDLE_ERROR':
			return {
				...state,
				error: action.message
			}
		default:
			return state
	}
}

export default SignupReducer