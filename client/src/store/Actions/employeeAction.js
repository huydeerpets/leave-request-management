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
	return (dispatch) => {
		const employeeNumber = localStorage.getItem('id')
		fetch('http://localhost:8080/api/employee/pending/' + employeeNumber, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				console.log(body)

				let payload = {
					loading: false,
					users: body

				}
				console.log(payload, 'aaa')
				dispatch(pendingFetch(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export function acceptFetchData() {
	return (dispatch) => {
		const employeeNumber = localStorage.getItem('id')
		fetch('http://localhost:8080/api/employee/accept/' + employeeNumber, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				console.log(body)

				let payload = {
					loading: false,
					users: body

				}
				console.log(payload, 'aaa')
				dispatch(acceptFetch(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export function rejectFetchData() {
	return (dispatch) => {
		const employeeNumber = localStorage.getItem('id')
		fetch('http://localhost:8080/api/employee/reject/' + employeeNumber, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				console.log(body)

				let payload = {
					loading: false,
					users: body

				}
				console.log(payload, 'aaa')
				dispatch(rejectFetch(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export function deleteRequest(users, id) {
	return (dispatch) => {
		fetch('http://localhost:8080/api/employee/leave/' + id, {
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