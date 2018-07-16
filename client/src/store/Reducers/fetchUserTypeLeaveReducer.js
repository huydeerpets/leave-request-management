let userTypeState = {
    userType: [],
}

export default function fetchUserSummaryReducer(state = userTypeState, action) {
    switch (action.type) {
        case 'FETCH_USER_TYPE':
            return {
                ...action.payload
            }
        default:
            return state
    }
}