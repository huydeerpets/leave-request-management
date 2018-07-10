let passwordState = {
	old_password: "",
	new_password: "",
	confirm_password: ""
}

export default function passwordReducer(state = passwordState, action) {
	switch (action.type) {
		case 'UPDATE_NEW_PASSWORD':
			return {
				...action.payload
			}
		default:
			return state
	}
}