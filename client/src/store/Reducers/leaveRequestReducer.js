const leave = {
	type_leave_id: null,
	reason: '',
	date_from: '',
	date_to: '',
	half_dates: [],
	back_on: '',
	contact_address: '',
	contact_number: ''
}

export default function leaveRequestReducer(state = leave, action) {
	switch (action.type) {
		case 'CREATE_LEAVE':
			return {
				...action.payload,
			}
		case 'CLEAR_FIELD':
			return {
				...leave
			}
		default:
			return state
	}
}