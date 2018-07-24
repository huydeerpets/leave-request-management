import {
	ROOT_API
} from "./types.js"

function profileloaded(payload) {
	return {
		type: 'PROFILE_LOADED',
		payload: payload
	}
}

export function profileFetchData() {
	const employeeNumber = localStorage.getItem('id')
	return (dispatch) => {
		fetch(`${ROOT_API}/api/admin/user/${employeeNumber}/`, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				let payload = {
					loading: false,
					user: body
				}
				dispatch(profileloaded(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}