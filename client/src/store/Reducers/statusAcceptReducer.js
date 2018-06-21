const leavePending = {
	loading: true,
	users: []
}

export default function fetchReqAcceptReducer(state = leavePending, action) {
	switch (action.type) {
		case 'FETCH_REQUEST_ACCEPT':
			return {
				...action.payload
			}
		default:
			return state
	}
}