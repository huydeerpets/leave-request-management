
function pendingFetch(payload) {
	return {
		type: 'FETCH_LEAVE_PENDING',
		payload: payload
	}
}

export function pendingFetchData() {
	const employeeNumber = localStorage.getItem('id')
	console.log("===============", employeeNumber)
	return (dispatch) => {
		fetch('http://localhost:8080/api/supervisor/' + employeeNumber, {
			method: 'GET',
		})
			.then((resp) => resp.json())
			.then(({ body }) => {
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


