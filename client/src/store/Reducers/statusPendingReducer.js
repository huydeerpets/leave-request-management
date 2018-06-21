const leavePending = {
	loading: true,
	users: []
}

export default function fetchReqPendingReducer(state = leavePending, action) {
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
		default:
			return state
	}
}