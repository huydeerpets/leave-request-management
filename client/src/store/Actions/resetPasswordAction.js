export function handleEdit(payload) {
	return (dispatch) => {
		dispatch({
			type: 'RESET_PASSWORD',
			payload: payload
		})
	}
}

export function resetPassword(savePassword, pusher) {
	return (dispatch) => {
		fetch(`http://localhost:8080/api/user/password-reset`, {
				method: 'PUT',
				body: JSON.stringify(savePassword)
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				if (body === "reset password success, please check your email") {
					alert("reset password success, please check your email")
					pusher('/')
				} else if (error === "email not register") {
					alert("email not register")
				}
			}).catch(err => {
				console.log(err)
			})
	}
}