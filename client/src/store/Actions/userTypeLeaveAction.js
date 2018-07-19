import {
	ROOT_API
} from "./types.js"

function userTypeLeave(payload) {
	return {
		type: 'FETCH_USER_TYPE',
		payload: payload
	}
}

export function userTypeFetch() {
	const employeeNumber = localStorage.getItem('id')
	return (dispatch) => {
		fetch(`${ROOT_API}/api/user/type-leave/${employeeNumber}`, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {

				let payload = {
					userType: body
				}
				dispatch(userTypeLeave(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}