const leave = {
	type_of_leave: '',
	reason: '',
	date_from: '',
	date_to: '',
	back_on: '',
	address: '',
	contact_leave: ''
}

export default function leaveRequestReducer(state = leave, action) {
	switch (action.type) {
		case 'CREATE_LEAVE':
			return {
				...action.payload
			}
		case 'CLEAR_FIELD':
			return {
				...leave
			}
		default:
			return state
	}
}