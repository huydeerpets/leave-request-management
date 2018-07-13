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
		fetch('http://localhost:8080/api/director/pending/', {
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
	return (dispatch) => {
		fetch('http://localhost:8080/api/director/accept/', {
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
	return (dispatch) => {
		fetch('http://localhost:8080/api/director/reject/', {
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
		fetch(`http://localhost:8080/api/director/accept/${id}/${enumber}`, {
				method: 'PUT',
			})
			.then(response => {
				let newUserlist = users.filter(el => el.id !== id)
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

export function updateStatusReject(users, id, enumber, payload) {
	return (dispatch) => {
		fetch(`http://localhost:8080/api/director/reject/${id}/${enumber}`, {
				method: 'PUT',
				body: JSON.stringify(payload)
			})
			.then(response => {
				let newUserlist = users.filter(el => el.id !== id)
				let payloads = {
					loading: false,
					users: [
						...newUserlist
					]
				}
				dispatch(rejectRequest(payloads))

			}).catch(err => {
				console.log(err)
			})
	}
}