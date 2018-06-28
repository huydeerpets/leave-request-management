const leaveRequest = {
	loading: true,
	users: []
}

export default function fetchEmployeeReducer(state = leaveRequest, action) {
	switch (action.type) {
		case 'FETCH_REQUEST_PENDING':
			return {
				...action.payload
			}
		case 'UPDATE_REQUEST_PENDING':
			return {
				...action.payload
			}
		case 'DELETE_REQUEST_PENDING':
			return {
				...action.payload
			}
		case 'FETCH_REQUEST_ACCEPT':
			return {
				...action.payload
			}
		case 'FETCH_REQUEST_REJECT':
			return {
				...action.payload
			}
		default:
			return state
	}
}