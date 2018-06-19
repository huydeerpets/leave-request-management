const SignUp = {
	employee_number: '',
	name: '',
	gender: '',
	position: '',
	start_working_date: '',
	mobile_phone: '',
	email: '',
	password: '',
	role: '',
	supervisor_id: ''
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