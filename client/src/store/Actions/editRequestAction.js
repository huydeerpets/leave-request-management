function fetchRequest(payload) {
	return {
		type: 'FETCH_EDIT',
		payload: payload
	}
}

function requestEditing(payload) {
	return {
		type: 'EDITING_REQUEST',
		payload: payload
	}
}

export function handleEdit(newLeave) {
	return (dispatch) => {
		let payload = {
			loading: false,
			leave: {
				...newLeave
			}
		}
		dispatch(requestEditing(payload))
	}
}

export function fetchedEdit(leave) {
	return (dispatch) => {
		let payload = {
			loading: false,
			leave: {
				...leave
			}
		}
		dispatch(fetchRequest(payload))
	}
}

export function saveEditLeave(savedLeave, pusher) {
	console.log("user==========>", JSON.stringify(savedLeave))
	return (dispatch) => {
		fetch(`http://localhost:8080/api/employee/leave/${savedLeave.id}`, {
				method: 'PUT',
				body: JSON.stringify(savedLeave)
			})
			.then((resp) => resp.json())
			.then(({
				body,
				error
			}) => {
				console.log("err==========>", body)
				if (body === "Update leave success") {
					pusher('/request-pending')					
				}
			}).catch(err => {
				console.log(err)
			})
	}
}