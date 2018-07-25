import {
	ROOT_API
} from "./types.js"
import {
	message
} from "antd"

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
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				if (body !== null) {
					let newUserlist = users.filter(el => el.id !== id)
					let payload = {
						loading: false,
						leave: [
							...newUserlist
						]
					}
					dispatch(cancelRequest(payload))
					message.success(body)
				} else {
					message.error(error)
				}
			}).catch(err => {
				message.error(err)
			})
	}
}

export function downloadReport(from, to) {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/leave/reports?fromDate=${from}&toDate=${to}`, {
				method: 'GET',
				// responseType: 'blob',
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {				
				if (body !== null) {
					const url = window.URL.createObjectURL(new Blob([arrayToCSV(body)]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'report_leave_request.xlsx');
					document.body.appendChild(link);
					link.click();
					message.success('Download success')					
				} else if (body === null) {					
					message.error('Data is not available')
				} else {
					message.error(error)
				}
			})
			.catch(err => {
				message.error(err)
				console.log("err", err)
			})
	}
}

export function downloadReportTypeLeave(from, to, id) {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/leave/report/type?fromDate=${from}&toDate=${to}&typeID=${id}`, {
				method: 'GET',
				// responseType: 'blob',
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {				
				if (body !== null) {
					const url = window.URL.createObjectURL(new Blob([arrayToCSV(body)]));
					const link = document.createElement('a');
					link.href = url;
					link.setAttribute('download', 'report_leave_request_by_type_leave.xlsx');
					document.body.appendChild(link);
					link.click();
					message.success('Download success')					
				} else if (body === null) {					
					message.error('Data is not available')
				} else {
					message.error(error)
				}
			})
			.catch(err => {
				message.error(err)
				console.log("err", err)
			})
	}
}

function arrayToCSV(objArray) {
	const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
	let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

	return array.reduce((str, next) => {
		str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
		return str;
	}, str);
}