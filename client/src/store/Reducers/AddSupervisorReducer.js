let supervisorState = {
    supervisor: [],
}

export default function AddSupervisorReducer(state = supervisorState, action) {
    switch (action.type) {
        case 'ADD_SUPERVISOR':
            return {
                ...action.payload
            }
        default:
            return state
    }
}