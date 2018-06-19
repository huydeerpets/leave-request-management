import axios from 'axios'

function adminloaded(payload) {
	return {
		type: 'ADMIN_LOADED',
		payload: payload
	}
}

function userDeleted(payload) {
	return {
		type: 'DELETED_USER',
		payload: payload
	}
}

export function adminFetchData() {
	return (dispatch) => {
		fetch('http://localhost:8080/api/user', {
			method: 'GET',
		})
			.then((resp) => resp.json())
			.then(({ body }) => {
				console.log(body)

				let payload = {
					loading: false,
					users: body

				}
				console.log(payload, 'aaa')
				dispatch(adminloaded(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export function deleteUser(users, userId) {
	return (dispatch) => {
		axios.delete('http://localhost:3100/users/' + userId)
			.then(response => {
				console.log(response, 'ini apa ya?')
				if (response.status === 200) {
					let newUserlist = users.filter(el => el.id !== userId)
					console.log(newUserlist)
					let payload = {
						loading: false,
						users: [
							...newUserlist
						]
					}
					dispatch(userDeleted(payload))
				}
			}).catch(err => {
				console.log(err)
			})
	}
}

