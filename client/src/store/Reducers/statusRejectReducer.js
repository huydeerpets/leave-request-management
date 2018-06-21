const leavePending = {
	loading: true,
	users: []
}

export default function fetchReqRejectReducer(state = leavePending, action) {
	switch (action.type) {
		case 'FETCH_REQUEST_REJECT':
			return {
				...action.payload
			}
		default:
			return state
	}
}