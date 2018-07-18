import {
	ROOT_API
} from "./types.js"

const employeeNumber = localStorage.getItem('id')

function userTypeLeave(payload) {
	return {
		type: 'FETCH_USER_TYPE',
		payload: payload
	}
}

export function userTypeFetch() {
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