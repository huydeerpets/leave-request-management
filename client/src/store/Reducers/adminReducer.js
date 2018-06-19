let adminState = {
	loading: true,
	users: []
}

export default function adminReducer  (state = adminState, action){
	switch (action.type) {
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