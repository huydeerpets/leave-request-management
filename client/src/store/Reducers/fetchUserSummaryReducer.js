let userSummaryState = {
    userSummary: [],
}

export default function fetchUserSummaryReducer(state = userSummaryState, action) {
    switch (action.type) {
        case 'FETCH_USER_SUMMARY':
            return {
                ...action.payload
            }
        default:
            return state
    }
}