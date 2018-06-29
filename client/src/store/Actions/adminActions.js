function leaveloaded(payload) {
	return {
		type: 'LEAVE_LOADED',
		payload: payload
	}
}

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
		fetch('http://localhost:8080/api/admin/user', {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
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

export function deleteUser(users, employeeNumber) {
	return (dispatch) => {
		fetch('http://localhost:8080/api/admin/user/delete/' + employeeNumber, {
				method: 'DELETE',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				let newUserlist = users.filter(el => el.employee_number !== employeeNumber)
				console.log(newUserlist)
				let payload = {
					loading: false,
					users: [
						...newUserlist
					]
				}
				dispatch(userDeleted(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export function leaveFetchData() {
	return (dispatch) => {
		fetch('http://localhost:8080/api/admin/leave', {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				console.log(body)

				let payload = {
					loading: false,
					users: body
				}
				console.log(payload, 'aaa')
				dispatch(leaveloaded(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}