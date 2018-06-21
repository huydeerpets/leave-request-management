function pendingFetch(payload) {
	return {
		type: 'FETCH_REQUEST_PENDING',
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