const userState = {
	loading: true,
	user: {
		employee_number: '',
		name: '',
		gender: '',
		position: '',
		start_working_date: '',
		mobile_phone: '',
		email: '',
		role: '',
		supervisor_id: ''
	}
}

const editUserReducer = (state = userState, action) => {
	switch (action.type) {
		case 'FETCH_EDIT':
			return {
				...action.payload
			}
		case 'EDITING_USER':
			return {
				...action.payload
			}	
		default:
			return state
	}
}

export default editUserReducer