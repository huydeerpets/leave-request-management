import {
	ROOT_API
} from "./types.js"

const employeeNumber = localStorage.getItem('id')

function profileloaded(payload) {
	return {
		type: 'PROFILE_LOADED',
		payload: payload
	}
}

export function profileFetchData() {

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