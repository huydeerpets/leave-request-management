import axios from "axios"

function fetchUser(payload) {
	return {
		type: 'FETCH_EDIT',
		payload: payload
	}
}

function userEditing(payload) {
	return {
		type: 'EDITING_USER',
		payload: payload
	}
}

export function handleEdit(newUser) {
	return (dispatch) => {
		let payload = {
			loading: false,
			user: {
				...newUser
			}
		}
		dispatch(userEditing(payload))
	}
}

export function fetchedEdit(user) {
	return (dispatch) => {
		let payload = {
			loading: false,
			user: {
				...user
			}
		}
		dispatch(fetchUser(payload))
	}
}

export function saveEditUser(savedUser, pusher) {
	console.log("user==========>", JSON.stringify(savedUser))
	return (dispatch) => {
		fetch(`http://localhost:8080/api/admin/user/${savedUser.employee_number}`, {
				method: 'PUT',
				body: JSON.stringify(savedUser)
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				console.log("err==========>", error)
				if (body === "update user success") {
					pusher('/admin')
				}
			}).catch(err => {
				console.log(err)
			})
	}
}