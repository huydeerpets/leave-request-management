import {
	ROOT_API,
	FETCH_LEAVE_PENDING,
	FETCH_LEAVE_APPROVE,
	FETCH_LEAVE_REJECT,
	APPROVE_LEAVE_PENDING,
	REJECT_LEAVE_PENDING
} from "./types"
import {
	message
} from "antd";

function pendingFetch(payload) {
	return {
		type: FETCH_LEAVE_PENDING,
		payload: payload
	}
}

function approveFetch(payload) {
	return {
		type: FETCH_LEAVE_APPROVE,
		payload: payload
	}
}

function rejectFetch(payload) {
	return {
		type: FETCH_LEAVE_REJECT,
		payload: payload
	}
}

function approveRequest(payload) {
	return {
		type: APPROVE_LEAVE_PENDING,
		payload: payload
	}
}

function rejectRequest(payload) {
	return {
		type: REJECT_LEAVE_PENDING,
		payload: payload
	}
}

export function pendingFetchData() {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/director/pending`, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				let payload = {
					loading: false,
					leave: body
				}
				dispatch(pendingFetch(payload))

				if (error !== null) {
					console.error("err not null @pendingFetchData: ", error)
				}
			})
			.catch(err => {
				console.error("err @pendingFetchData: ", err)
			})
	}
}

export function acceptFetchData() {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/director/accept`, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				let payload = {
					loading: false,
					leave: body
				}
				dispatch(approveFetch(payload))

				if (error !== null) {
					console.error("err not null @acceptFetchData: ", error)
				}
			})
			.catch(err => {
				console.error("err @acceptFetchData: ", err)
			})
	}
}

export function rejectFetchData() {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/director/reject/`, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				let payload = {
					loading: false,
					leave: body
				}
				dispatch(rejectFetch(payload))

				if (error !== null) {
					console.error("err not null @rejectFetchData: ", error)
				}
			})
			.catch(err => {
				console.error("err @rejectFetchData: ", err)
			})
	}
}

export function updateStatusAccept(users, id, enumber) {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/director/accept/${id}/${enumber}/`, {
				method: 'PUT',
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error,
			}) => {
				if (body !== null) {
					let newUserlist = users.filter(el => el.id !== id)
					let payload = {
						loading: false,
						leave: [
							...newUserlist
						]
					}
					dispatch(approveRequest(payload))
					message.success(body)
				} else {
					message.error(error)
				}
			}).catch(err => {
				console.error("err @updateStatusAccept: ", err)
			})
	}
}

export function updateStatusReject(users, id, enumber, payload) {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/director/reject/${id}/${enumber}/`, {
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
						leave: [
							...newUserlist
						]
					}
					dispatch(rejectRequest(payloads))
					message.success(body)
				} else {
					message.error(error)
				}
			}).catch(err => {
				console.error("err @updateStatusReject: ", err)
			})
	}
}