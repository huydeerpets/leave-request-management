import {
	ROOT_API
} from "./types.js"

function userSummary(payload) {
	return {
		type: 'FETCH_USER_SUMMARY',
		payload: payload
	}
}

export function userSummaryFetchData() {
	const employeeNumber = localStorage.getItem('id')
	return (dispatch) => {
		Promise.all([
				fetch(`${ROOT_API}/api/user/summary/${employeeNumber}`, {
					method: 'GET',
				}),
				fetch(`${ROOT_API}/api/user/type-leave/${employeeNumber}`, {
					method: 'GET',
				})
			])
			.then(([respSummary1, respType]) => [respSummary1.json(), respType.json()])
			.then(([dataSummary, dataType]) => {
				dataSummary.then((resultSummary) => {
						dataType.then((resultType) => {
								let payload = {
									loading: false,
									userSummary: resultSummary.body,
									userType: resultType.body
								}
								dispatch(userSummary(payload))
							})
							.catch(err => {
								console.log(err)
							})
					})
					.catch(err => {
						console.log(err)
					})
			})
			.catch(err => {
				console.log(err)
			})
	}
}