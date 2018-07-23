import {
	ROOT_API
} from "./types.js"
import saveAs from "file-saver"

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

function adminloaded(payload) {
	return {
		type: 'ADMIN_LOADED',
		payload: payload
	}
}

function userDeleted(payload) {
	return {
		type: 'DELETED_USER',
		payload: payload
	}
}

function cancelRequest(payload) {
	return {
		type: 'CANCEL_LEAVE_REQUEST',
		payload: payload
	}
}


export function adminFetchData() {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/admin/user/`, {
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
				dispatch(adminloaded(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export function deleteUser(users, employeeNumber) {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/admin/user/${employeeNumber}`, {
				method: 'DELETE',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				let newUserlist = users.filter(el => el.employee_number !== employeeNumber)
				console.log(newUserlist)
				let payload = {
					loading: false,
					users: [
						...newUserlist
					]
				}
				dispatch(userDeleted(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export function pendingFetchData() {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/admin/leave/pending/`, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				let payload = {
					loading: false,
					leave: body
				}
				dispatch(pendingFetch(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export function acceptFetchData() {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/admin/leave/accept/`, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				let payload = {
					loading: false,
					leave: body
				}
				dispatch(acceptFetch(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}


export function rejectFetchData() {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/admin/leave/reject/`, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				let payload = {
					loading: false,
					leave: body
				}
				dispatch(rejectFetch(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export function cancelRequestLeave(users, id, enumber) {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/admin/leave/cancel/${id}/${enumber}/`, {
				method: 'PUT',
			})
			.then(response => {
				let newUserlist = users.filter(el => el.id !== id)
				let payload = {
					loading: false,
					leave: [
						...newUserlist
					]
				}
				dispatch(cancelRequest(payload))

			}).catch(err => {
				console.log(err)
			})
	}
}

export function downloadReport(from, to) {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/leave/report?fromDate=${from}&toDate=${to}`, {
				method: 'GET',
				responseType: 'blob',
			})
			.then(response => response.blob())
			.then(blob => URL.createObjectURL(blob))
			// .then(url => {
			// 	console.log(url)
			// 	window.open(url, '_blank');
			// 	URL.revokeObjectURL(url);
			// })
			// .then((response) => {
			// 	const url = window.URL.createObjectURL(new Blob([response.blob()]));
			// 	console.log("================", url)
			// 	const link = document.createElement('a');
			// 	link.href = url;
			// 	link.setAttribute('download', 'file.csv');
			// 	document.body.appendChild(link);
			// 	link.click();
			// })
			.catch(err => {
				console.log("err", err)
			})
	}
}