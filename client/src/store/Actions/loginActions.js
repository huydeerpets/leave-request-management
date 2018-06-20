import jwtDecode from 'jwt-decode';
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
				const data = body
				const token = body['Token']
				const id = body['ID']
				const role = body['Role']

				if (error === "Failed get user, email not register") {
					console.log(error)
					alert('Email not register, please register')
					dispatch(clearField())
				} else if (error === "Wrong Password") {
					console.log(error)
					alert('Wrong Password')
					dispatch(clearField())
				} else {
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
						pusher('/supervisor')
						dispatch(clearField())
					} else if (role === 'employee') {
						localStorage.setItem('token', token)
						localStorage.setItem('role', role)
						localStorage.setItem('id', id)
						pusher('/employee')
						dispatch(clearField())
					} else if (role !== 'admin' || role !== 'director' || role !== 'supervisor' || role !== 'employee') {
						alert('Email not register, please register')
						pusher('/')
						dispatch(clearField())
					}
					console.log("RESPONSE BODY=======>", data)
					console.log("TOKEN=======>", token);
					console.log("DECODE_TOKEN=======>", jwtDecode(token));
				}
			})
			.catch(err => {
				console.log(err)
				alert(err)
				dispatch(clearField())
			})
	}
}