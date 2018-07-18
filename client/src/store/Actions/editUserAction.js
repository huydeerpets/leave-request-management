import {
	ROOT_API
} from "./types.js"

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
	return (dispatch) => {
		fetch(`${ROOT_API}/api/admin/user/${savedUser.employee_number}`, {
				method: 'PUT',
				body: JSON.stringify(savedUser)
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				if (body !== null) {
					alert(body)
					pusher('/admin')
				} else if (error !== null) {
					alert(error)
				}
			}).catch(err => {
				console.log(err)
			})
	}
}