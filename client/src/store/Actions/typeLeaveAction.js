import {
	ROOT_API
} from "./types.js"

function typeLeaveFetch(payload) {
	return {
		type: 'FETCH_TYPE_LEAVE',
		payload: payload
	}
}

export function typeLeaveFetchData() {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/user/type-leave/`, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				let payload = {
					typeLeave: body
				}
				dispatch(typeLeaveFetch(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}