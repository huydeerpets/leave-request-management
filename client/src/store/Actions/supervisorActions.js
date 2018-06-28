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
	return (dispatch) => {
		const employeeNumber = localStorage.getItem('id')
		fetch('http://localhost:8080/api/supervisor/pending/' + employeeNumber, {
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
		fetch('http://localhost:8080/api/supervisor/accept/' + employeeNumber, {
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
		fetch('http://localhost:8080/api/supervisor/reject/' + employeeNumber, {
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
				dispatch(rejectFetch(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export function updateStatusAccept(users, id, enumber) {
	return (dispatch) => {
		fetch('http://localhost:8080/api/employee/accept/' + `${id}/${enumber}`, {
				method: 'PUT',
			})
			.then(response => {
				let newUserlist = users.filter(el => {
					el.id !== id && el.employee_number !== enumber
					return
				})
				let payload = {
					loading: false,
					users: [
						...newUserlist
					]
				}
				dispatch(acceptRequest(payload))

			}).catch(err => {
				console.log(err)
			})
	}
}

export function updateStatusReject(users, id, enumber) {
	return (dispatch) => {
		fetch('http://localhost:8080/api/employee/reject/' + `${id}/${enumber}`, {
				method: 'PUT',
			})
			.then(response => {
				let newUserlist = users.filter(el => {
					el.id !== id && el.id !== enumber
					el.employee_number !== enumber && el.employee_number !== id
				})
				console.log(newUserlist)
				let payload = {
					loading: false,
					users: [
						...newUserlist
					]
				}
				dispatch(rejectRequest(payload))

			}).catch(err => {
				console.log(err)
			})
	}
}