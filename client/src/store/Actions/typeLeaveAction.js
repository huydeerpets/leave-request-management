function typeLeaveFetch(payload) {
	return {
		type: 'FETCH_TYPE_LEAVE',
		payload: payload
	}
}

export function typeLeaveFetchData() {
	return (dispatch) => {		
		fetch('http://localhost:8080/api/user/type-leave', {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				console.log(body)
				let payload = {
					typeLeave: body
				}
				dispatch(typeLeaveFetch(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}