let adminState = {
	loading: true,
	users: [],
	leave: [],
}

export default function adminReducer(state = adminState, action) {
	switch (action.type) {
		case 'FETCH_LEAVE_PENDING':
			return {
				...action.payload
			}
		case 'FETCH_LEAVE_ACCEPT':
			return {
				...action.payload
			}
		case 'FETCH_LEAVE_REJECT':
			return {
				...action.payload
			}
		case 'ADMIN_LOADED':
			return {
				...action.payload
			}
		case 'DELETED_USER':
			return {
				...action.payload
			}
		default:
			return state
	}
}