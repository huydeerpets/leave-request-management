let profileState = {
	loading: true,
	user: [],
}

export default function profileReducer(state = profileState, action) {
	switch (action.type) {
		case 'PROFILE_LOADED':
			return {
				...action.payload
			}
		default:
			return state
	}
}