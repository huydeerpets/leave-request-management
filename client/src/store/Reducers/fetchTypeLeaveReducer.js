let typeLeaveState = {
    typeLeave: [],
}

export default function fetchTypeLeaveReducer(state = typeLeaveState, action) {
    switch (action.type) {
        case 'FETCH_TYPE_LEAVE':
            return {
                ...action.payload
            }
        default:
            return state
    }
}