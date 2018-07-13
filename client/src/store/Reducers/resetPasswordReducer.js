let resetPasswordState = {
	email: "",	
}

export default function resetPasswordReducer(state = resetPasswordState, action) {
	switch (action.type) {
		case 'RESET_PASSWORD':
			return {
				...action.payload
			}
		default:
			return state
	}
}