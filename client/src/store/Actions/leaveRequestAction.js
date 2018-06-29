export function formOnChange(payload) {
	return (dispach) => {
		dispach({
			type: 'CREATE_LEAVE',
			payload: payload
		})
	}
}

function clearField() {
	return {
		type: 'CLEAR_FIELD'
	}
}

export function SumbitLeave(payload) {
	const employeeNumber = localStorage.getItem('id')
	console.log("===============", employeeNumber)
	return (dispatch) => {
		fetch('http://localhost:8080/api/leave/' + employeeNumber, {
				method: 'POST',
				body: JSON.stringify(payload)
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				let respErr = error
				if (respErr === "type request malform") {
					console.log(respErr)
					alert('create failed, please field out all field')
				} else {
					dispatch(clearField())
					alert('create leave request success')
				}
			}).catch(err => {
				console.log(err)
			})
	}
}

export function SumbitLeaveSupervisor(payload) {
	const employeeNumber = localStorage.getItem('id')	
	return (dispatch) => {
		fetch('http://localhost:8080/api/supervisor/leave/' + employeeNumber, {
				method: 'POST',
				body: JSON.stringify(payload)
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				let respErr = error
				if (respErr === "type request malform") {
					console.log(respErr)
					alert('create failed, please field out all field')
				} else {
					dispatch(clearField())
					alert('create leave request success')
				}
			}).catch(err => {
				console.log(err)
			})
	}
}