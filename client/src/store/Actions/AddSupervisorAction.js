import {
	ROOT_API
} from "./types.js"

function addSupervisor(payload) {
	return {
		type: 'ADD_SUPERVISOR',
		payload: payload
	}
}

export function SupervisorAdd() {
	return (dispatch) => {
		fetch(`${ROOT_API}/api/user/supervisor`, {
				method: 'GET',
			})
			.then((resp) => resp.json())
			.then(({
				body
			}) => {
				let payload = {
					supervisor: body
				}
				dispatch(addSupervisor(payload))
			})
			.catch(err => {
				console.log(err)
			})
	}
}