import {
	ROOT_API
} from "./types.js"
import {
	message
} from "antd";

export function formOnChange(payload) {
	return (dispach) => {
		dispach({
			type: 'CREATE_LEAVE',
			payload: payload
		})
	}
}

function clearField() {
	return {
		type: 'CLEAR_FIELD'
	}
}

export function SumbitLeave(payload, pusher) {
	const employeeNumber = localStorage.getItem('id')
	return (dispatch) => {
		fetch(`${ROOT_API}/api/employee/leave/${employeeNumber}`, {
				method: 'POST',
				body: JSON.stringify(payload)
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				let respErr = error
				if (body !== null) {
					dispatch(clearField())
					pusher('/employee-request-pending')
					message.success('Create leave request success')
				} else if (error === "type request malform") {
					message.error('Create failed, please check all field!')
				} else {
					message.error(error)
				}
			}).catch(err => {
				message.error('Create failed, please check all field!')
			})
	}
}

export function SumbitLeaveSupervisor(payload, pusher) {
	const employeeNumber = localStorage.getItem('id')
	return (dispatch) => {
		fetch(`${ROOT_API}/api/supervisor/leave/${employeeNumber}`, {
				method: 'POST',
				body: JSON.stringify(payload)
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				if (body !== null) {
					dispatch(clearField())
					pusher('/employee-request-pending')
					message.success('Create leave request success')
				} else if (error === "type request malform") {
					message.error('Create failed, please check all field!')
				} else {
					message.error(error)
				}
			}).catch(err => {
				message.error('Create failed, please check all field!')
			})
	}
}