let supervisorState = {
    loadingPending: true,
    usersPending: []
}

export default function supervisorReducer(state = supervisorState, action) {
    switch (action.type) {
        case 'FETCH_LEAVE_PENDING':
            return {
                ...action.payload
            }
        case 'ACCEPT_LEAVE_PENDING':
            return {
                ...action.payload
            }
        case 'REJECT_LEAVE_PENDING':
            return {
                ...action.payload
            }
        default:
            return state
    }
}