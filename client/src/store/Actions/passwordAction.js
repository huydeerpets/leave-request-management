import {
	ROOT_API
} from "./types.js"

export function handleEdit(payload) {
	return (dispatch) => {
		dispatch({
			type: 'UPDATE_NEW_PASSWORD',
			payload: payload
		})
	}
}

export function updateNewPassword(savePassword, pusher) {
	const employeeNumber = localStorage.getItem('id')
	return (dispatch) => {
		fetch(`${ROOT_API}/api/user/update/${employeeNumber}`, {
				method: 'PUT',
				body: JSON.stringify(savePassword)
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				if (body !== null) {
					alert(body)
					pusher('/profile')
				} else if (error !== null) {
					alert(error)
				} else {
					alert(error)
				}
			}).catch(err => {
				console.log(err)
			})
	}
}