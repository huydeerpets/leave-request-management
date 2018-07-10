const leaveState = {
	loading: true,
	leave: {
		type_leave_id: '',
		reason: '',
		date_from: '',
		date_to: '',
		back_on: '',
		contact_address: '',
		contact_number: ''
	}
}

const editRequestReducer = (state = leaveState, action) => {
	switch (action.type) {
		case 'FETCH_EDIT':
			return {
				...action.payload
			}
		case 'EDITING_REQUEST':
			return {
				...action.payload
			}
		default:
			return state
	}
}

export default editRequestReducer