import {
	ROOT_API
} from "./types.js"
import {
	message
} from "antd";

export function formOnchange(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SIGNUP_USER',
			payload: payload
		})
	}
}

function clearField(msg) {
	return {
		type: 'CLEAR_FIELD'
	}
}

function errorHandle(err) {
	return {
		type: "HANDLE_ERROR",
		message: err
	}
}

export function SumbitSignUp(payload) {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/admin/user/register`, {
				method: 'POST',
				body: JSON.stringify(payload)
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				if (body !== null) {
					message.success(body)
				} else if (error === "type request malform") {
					let errMsg = 'Error empty field!'
					message.error(errMsg)
				} else {
					message.error(error)
				}
			}).catch(err => {
				let errMsg = 'Regiter failed, please check all field!'
				message.error(errMsg)
			})
	}
}