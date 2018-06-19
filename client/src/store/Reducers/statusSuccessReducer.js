const leaveSuccess = {
	loading: true,
	success: []
}

export default function successReducer(state = leaveSuccess, action) {
	switch (action.type) {
		case 'FETCH_LEAVE_SUCCESS':
			return {
				...action.payload
			}
		case 'UPDATE_lEAVE_SUCCESS':
			return {
				...action.payload
			}
		case 'DELETE_LEAVE_SUCCESS':
			return {
				...action.payload
			}
		default:
			return state
	}
}