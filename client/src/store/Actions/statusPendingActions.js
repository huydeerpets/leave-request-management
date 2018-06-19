import axios from 'axios'

function pendingLoaded(payload) {
	return {
		type: 'FETCH_LEAVE_PENDING',
		payload: payload
	}
}

function pendingUpdate(payload) {
	return {
		type: 'UPDATE_lEAVE_PENDING',
		payload: payload
	}
}

function pendingDelete(payload) {
	return {
		type: 'DELETE_LEAVE_PENDING',
		payload: payload
	}
}

export function leavePendingFetchData() {
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
				dispatch(pendingLoaded(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}


export function leavePendingUpdate(menu, orderId) {
	return (dispatch) => {
		axios.post('http://localhost:3100/chef/' + orderId)
			.then(response => {
				console.log(response, 'hhuhu')
				if (response.data.msg == 'success') {
					menu.forEach(el => {
						if (el.id == orderId) {
							el.status = true
						}
					})
					let payload = {
						loading: false,
						menu: [
							...menu
						]
					}
					console.log('hahaasas', payload)
					dispatch(donemenu(payload))
				}
			}).catch(err => {
				console.log(err)
			})
	}
}

export function leavePendingDelete(users, userId) {
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
					dispatch(pendingDelete(payload))
				}
			}).catch(err => {
				console.log(err)
			})
	}
}

