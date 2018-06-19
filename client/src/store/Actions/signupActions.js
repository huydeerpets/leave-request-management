export function formOnchange(payload) {
	return (dispach) => {
		dispach({
			type: 'SIGNUP_USER',
			payload: payload
		})
	}
}

function clearField() {
	return {
		type: 'CLEAR_FIELD'
	}
}

export function SumbitSignUp(payload) {
	return (dispatch) => {
		fetch('http://localhost:8080/api/register', {
			method: 'POST',
			body: JSON.stringify(payload)
		})
			.then((resp) => resp.json())
			.then(({ body, error }) => {
				let respErr = error
				if (respErr === "type request malform") {
					console.log(respErr)
					alert('regiter failed, please field out all field')
				} else {
					dispatch(clearField())
					alert('register success, please login')
				}


			}).catch(err => {
				console.log(err)
			})
	}
}