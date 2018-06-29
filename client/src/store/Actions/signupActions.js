export function formOnchange(payload) {
	return (dispatch) => {
		dispatch({
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
		fetch('http://localhost:8080/api/admin/user/register', {
				method: 'POST',
				body: JSON.stringify(payload)
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				let respErr = error
				console.log("=================error", respErr)
				if (respErr === "type request malform") {
					alert('regiter failed, please field out all field')
				} else if (respErr === "Email already register") {
					alert('regiter failed, email already register')
				} else {
					dispatch(clearField())
					alert('register success')
					window.location.href = "/admin";
				}

			}).catch(err => {
				console.log(err)
			})
	}
}