function makeid() {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

const SignUp = {
	employee_number: '',
	name: '',
	gender: '',
	position: '',
	start_working_date: '',
	mobile_phone: '',
	email: '',
	password: makeid(),
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