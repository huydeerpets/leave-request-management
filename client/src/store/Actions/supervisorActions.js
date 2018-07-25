import {
	ROOT_API
} from "./types.js"
import {
	message
} from "antd";

function pendingFetch(payload) {
	return {
		type: 'FETCH_LEAVE_PENDING',
		payload: payload
	}
}

function acceptFetch(payload) {
	return {
		type: 'FETCH_LEAVE_ACCEPT',
		payload: payload
	}
}

function rejectFetch(payload) {
	return {
		type: 'FETCH_LEAVE_REJECT',
		payload: payload
	}
}

function acceptRequest(payload) {
	return {
		type: 'ACCEPT_LEAVE_PENDING',
		payload: payload
	}
}

function rejectRequest(payload) {
	return {
		type: 'REJECT_LEAVE_PENDING',
		payload: payload
	}
}

export function pendingFetchData() {
	const employeeNumber = localStorage.getItem('id')
	return (dispatch) => {
		fetch(`${ROOT_API}/api/supervisor/pending/${employeeNumber}`, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				let payload = {
					loading: false,
					users: body
				}
				dispatch(pendingFetch(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export function acceptFetchData() {
	const employeeNumber = localStorage.getItem('id')
	return (dispatch) => {
		fetch(`${ROOT_API}/api/supervisor/accept/${employeeNumber}`, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				let payload = {
					loading: false,
					users: body
				}
				dispatch(acceptFetch(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export function rejectFetchData() {
	const employeeNumber = localStorage.getItem('id')
	return (dispatch) => {
		fetch(`${ROOT_API}/api/supervisor/reject/${employeeNumber}`, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				let payload = {
					loading: false,
					users: body
				}
				dispatch(rejectFetch(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export function updateStatusAccept(users, id, enumber) {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/supervisor/accept/${id}/${enumber}`, {
				method: 'PUT',
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				if (body !== null) {
					let newUserlist = users.filter(el => el.id !== id)
					let payload = {
						loading: false,
						users: [
							...newUserlist
						]
					}
					dispatch(acceptRequest(payload))
					message.success(body)
				} else {
					message.error(error)
				}
			}).catch(err => {
				message.error(err)
			})
	}
}

export function updateStatusReject(users, id, enumber, payload) {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/supervisor/reject/${id}/${enumber}`, {
				method: 'PUT',
				body: JSON.stringify(payload)
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				if (body !== null) {
					let newUserlist = users.filter(el => el.id !== id)
					let payloads = {
						loading: false,
						users: [
							...newUserlist
						]
					}
					dispatch(rejectRequest(payloads))
					message.success(body)
				} else {
					message.error(error)
				}
			}).catch(err => {
				message.error(err)
			})
	}
}