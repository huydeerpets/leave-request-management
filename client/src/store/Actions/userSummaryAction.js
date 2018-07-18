import {
	ROOT_API
} from "./types.js"

const employeeNumber = localStorage.getItem('id')

function userSummary(payload) {
	return {
		type: 'FETCH_USER_SUMMARY',
		payload: payload
	}
}

export function userSummaryFetchData() {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/user/summary/${employeeNumber}`, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				let payload = {
					userSummary: body
				}
				dispatch(userSummary(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}