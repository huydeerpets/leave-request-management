const SignUp = {
	employee_number: '',
	name: '',
	gender: '',
	position: '',
	start_working_date: '',
	mobile_phone: '',
	email: '',
	password: '12345',
	role: '',
	supervisor_id: 0
}

const SignupReducer = (state = SignUp, action) => {
	switch (action.type) {
		case 'SIGNUP_USER':
			return {
				...action.payload
			}
		case 'CLEAR_FIELD':
			return {
				...SignUp
			}
		default:
			return state
	}
}

export default SignupReducer