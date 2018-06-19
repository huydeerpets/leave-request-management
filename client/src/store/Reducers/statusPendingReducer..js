const leavePending = {
	loading: true,
	pending: []
}

export default function pendingReducer(state = leavePending, action) {
	switch (action.type) {
		case 'FETCH_LEAVE_PENDING':
			return {
				...action.payload
			}
		case 'UPDATE_lEAVE_PENDING':
			return {
				...action.payload
			}
		case 'DELETE_LEAVE_PENDING':
			return {
				...action.payload
			}
		default:
			return state
	}
}