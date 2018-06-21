function rejectFetch(payload) {
	return {
		type: 'FETCH_REQUEST_REJECT',
		payload: payload
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