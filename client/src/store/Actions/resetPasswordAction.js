import {
	ROOT_API
} from "./types.js"
import {
	message
} from "antd";


export function handleEdit(payload) {
	return (dispatch) => {
		dispatch({
			type: 'RESET_PASSWORD',
			payload: payload
		})
	}
}

export function resetPassword(savePassword, pusher) {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/user/password-reset`, {
				method: 'PUT',
				body: JSON.stringify(savePassword)
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				if (body !== null) {
					message.success(body)					
					pusher('/')
				} else {
					message.error(error)
				}
			}).catch(err => {
				message.error(err)
			})
	}
}