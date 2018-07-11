function addSupervisor(payload) {
	return {
		type: 'ADD_SUPERVISOR',
		payload: payload
	}
}

export function SupervisorAdd() {
	return (dispatch) => {
		fetch('http://localhost:8080/api/user/supervisor', {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				console.log(body)
				let payload = {
					supervisor: body
				}
				dispatch(addSupervisor(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}