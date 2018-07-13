function pendingFetch(payload) {
	return {
		type: 'FETCH_LEAVE_PENDING',
		payload: payload
	}
}

function acceptFetch(payload) {
	return {
		type: 'FETCH_LEAVE_ACCEPT',
		payload: payload
	}
}

function rejectFetch(payload) {
	return {
		type: 'FETCH_LEAVE_REJECT',
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
				let payload = {
					loading: false,
					users: body
				}
				dispatch(adminloaded(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export function deleteUser(users, employeeNumber) {
	return (dispatch) => {
		fetch('http://localhost:8080/api/admin/user/' + employeeNumber, {
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



export function pendingFetchData() {
	return (dispatch) => {		
		fetch('http://localhost:8080/api/admin/leave/pending/', {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {				
				let payload = {
					loading: false,
					users: body
				}
				dispatch(pendingFetch(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}

export function acceptFetchData() {
	return (dispatch) => {
		fetch('http://localhost:8080/api/admin/leave/accept/', {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {				
				let payload = {
					loading: false,
					users: body
				}
				dispatch(acceptFetch(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}


export function rejectFetchData() {
	return (dispatch) => {		
		fetch('http://localhost:8080/api/admin/leave/reject/', {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {				
				let payload = {
					loading: false,
					users: body
				}
				dispatch(rejectFetch(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}