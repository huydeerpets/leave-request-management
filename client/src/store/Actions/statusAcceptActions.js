function acceptFetch(payload) {
	return {
		type: 'FETCH_REQUEST_ACCEPT',
		payload: payload
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