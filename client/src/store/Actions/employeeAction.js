import {
	ROOT_API
} from "./types.js"

function pendingFetch(payload) {
	return {
		type: 'FETCH_REQUEST_PENDING',
		payload: payload
	}
}

function acceptFetch(payload) {
	return {
		type: 'FETCH_REQUEST_ACCEPT',
		payload: payload
	}
}


function rejectFetch(payload) {
	return {
		type: 'FETCH_REQUEST_REJECT',
		payload: payload
	}
}

function requestDeleted(payload) {
	return {
		type: 'DELETE_REQUEST_PENDING',
		payload: payload
	}
}

export function pendingFetchData() {
	const employeeNumber = localStorage.getItem('id')
	return (dispatch) => {
		fetch(`${ROOT_API}/api/employee/pending/${employeeNumber}`, {
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
		fetch(`${ROOT_API}/api/employee/accept/${employeeNumber}`, {
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
		fetch(`${ROOT_API}/api/employee/reject/${employeeNumber}`, {
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

export function deleteRequest(users, id) {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/employee/leave/${id}`, {
				method: 'DELETE',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				let newUserlist = users.filter(el => el.id !== id)
				let payload = {
					loading: false,
					users: [
						...newUserlist
					]
				}
				dispatch(requestDeleted(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}