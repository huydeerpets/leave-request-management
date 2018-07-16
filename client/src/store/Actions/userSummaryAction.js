function userSummary(payload) {
	return {
		type: 'FETCH_USER_SUMMARY',
		payload: payload
	}
}

export function userSummaryFetchData() {
	const employeeNumber = localStorage.getItem('id')
	return (dispatch) => {
		fetch(`http://localhost:8080/api/user/summary/${employeeNumber}`, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				let payload = {
					userSummary: body
				}
				dispatch(userSummary(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}