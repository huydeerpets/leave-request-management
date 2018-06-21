function pendingFetch(payload) {
	return {
		type: 'FETCH_LEAVE_PENDING',
		payload: payload
	}
}

function acceptRequest(payload) {
	return {
		type: 'ACCEPT_LEAVE_PENDING',
		payload: payload
	}
}

export function updateStatusAccept(users, employeeNumber) {
	return (dispatch) => {
		fetch('http://localhost:8080/api/employee/accept/' + employeeNumber, {
				method: 'PUT',
			})
			.then(response => {
				console.log(response, 'ini apa ya?')
				let newUserlist = users.filter(el => el.id !== employeeNumber)
				console.log(newUserlist)
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

export function pendingFetchData() {
	return (dispatch) => {
		const employeeNumber = localStorage.getItem('id')		
		fetch('http://localhost:8080/api/supervisor/' + employeeNumber, {
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