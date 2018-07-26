import {
	ROOT_API,
	FETCH_USER,
	DELETE_USER,
	FETCH_LEAVE_PENDING,
	FETCH_LEAVE_APPROVE,
	FETCH_LEAVE_REJECT,
	CANCEL_LEAVE_REQUEST
} from "./types"
import {
	message
} from "antd"

function userFetch(payload) {
	return {
		type: FETCH_USER,
		payload: payload
	}
}

function userDeleted(payload) {
	return {
		type: DELETE_USER,
		payload: payload
	}
}

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

function cancelRequest(payload) {
	return {
		type: CANCEL_LEAVE_REQUEST,
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
				body,
				error
			}) => {
				let payload = {
					loading: false,
					users: body
				}
				dispatch(userFetch(payload))

				if (error !== null) {
					console.error("err not null @adminFetchData: ", error)
				}
			})
			.catch(err => {
				console.error("err @adminFetchData: ", err)
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
				body,
				error
			}) => {
				let newUserlist = users.filter(el => el.employee_number !== employeeNumber)
				let payload = {
					loading: false,
					users: [
						...newUserlist
					]
				}
				dispatch(userDeleted(payload))

				if (error !== null) {
					console.error("err not null @deleteUser: ", error)
				}
			})
			.catch(err => {
				console.error("err @deleteUser: ", err)
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
		fetch(`${ROOT_API}/api/admin/leave/accept/`, {
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
		fetch(`${ROOT_API}/api/admin/leave/reject/`, {
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
				console.error("err @cancelRequestLeave: ", err)
			})
	}
}

export function downloadReport(from, to) {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/leave/reports?fromDate=${from}&toDate=${to}`, {
				method: 'GET'
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
				console.error("err @downloadReport: ", err)
			})
	}
}

export function downloadReportTypeLeave(from, to, id) {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/leave/report/type?fromDate=${from}&toDate=${to}&typeID=${id}`, {
				method: 'GET'
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
				console.error("err @downloadReportTypeLeave: ", err)
			})
	}
}

function arrayToCSV(objArray) {
	const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
	let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n'; // eslint-disable-line

	return array.reduce((str, next) => {
		str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n'; // eslint-disable-line
		return str;
	}, str);
}