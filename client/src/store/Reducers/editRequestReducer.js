const leaveState = {
	loading: true,
	leave: {
		type_of_leave: '',
		reason: '',
		date_from: '',
		date_to: '',
		back_on: '',
		address: '',
		contact_leave: ''
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