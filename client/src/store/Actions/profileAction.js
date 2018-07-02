function profileloaded(payload) {
	return {
		type: 'PROFILE_LOADED',
		payload: payload
	}
}

export function adminFetchData() {
	const employeeNumber = localStorage.getItem('id')
	return (dispatch) => {
		fetch(`http://localhost:8080/api/admin/user/${employeeNumber}`, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				console.log(body)

				let payload = {
					loading: false,
					user: body

				}
				dispatch(profileloaded(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}