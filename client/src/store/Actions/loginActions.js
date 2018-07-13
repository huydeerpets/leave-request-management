// import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../../utils/setAuthorizationToken';

export function handleFormInput(payload) {
	return {
		type: 'LOGIN_FORM_ONCHANGE',
		payload: payload
	}
}

function clearField() {
	return {
		type: 'FIELD_CLEAR'
	}
}

function errorHandle(payload) {
	return {
		type: "HANDLE_ERROR",
		payload: payload
	}
}

export function submitLogin(payload, pusher) {
	return (dispatch) => {
		fetch('http://localhost:8080/api/login', {
				method: 'POST',
				body: JSON.stringify(payload)
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				let payloadError

				if (error === "Failed get user, email not register") {
					payloadError = {
						message: 'Email not register',
						is_error: true,
					}
					dispatch(errorHandle(payloadError))
				} else if (error === "Wrong Password") {
					payloadError = {
						message: 'Wrong Password',
						is_error: true,
					}
					dispatch(errorHandle(payloadError))
				} else {
					const token = body['Token']
					const id = body['ID']
					const role = body['Role']
					setAuthorizationToken(token);

					if (role === 'admin') {
						localStorage.setItem('token', token)
						localStorage.setItem('role', role)
						localStorage.setItem('id', id)
						pusher('/admin')
						dispatch(clearField())

					} else if (role === 'director') {
						localStorage.setItem('token', token)
						localStorage.setItem('role', role)
						localStorage.setItem('id', id)
						pusher('/director')
						dispatch(clearField())

					} else if (role === 'supervisor') {
						localStorage.setItem('token', token)
						localStorage.setItem('role', role)
						localStorage.setItem('id', id)
						// payloadError = {
						// 	message: 'Login success!',
						// 	is_error: false,
						// }
						// dispatch(errorHandle(payloadError))
						dispatch(clearField())
						pusher('/supervisor')

					} else if (role === 'employee') {
						localStorage.setItem('token', token)
						localStorage.setItem('role', role)
						localStorage.setItem('id', id)
						pusher('/employee')
						dispatch(clearField())

					} else if (role !== 'admin' || role !== 'director' || role !== 'supervisor' || role !== 'employee') {
						pusher('/')
						dispatch(clearField())
					}
				}
			})
			.catch(err => {
				let errMsg = 'Please check your email and password'
				dispatch(errorHandle(errMsg))
			})
	}
}