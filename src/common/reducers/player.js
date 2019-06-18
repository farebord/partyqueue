import { REQUEST_CURRENT_PLAYBACK, RECEIVED_CURRENT_PLAYBACK } from '../actions'

const initialState = {
    loading: false
}

const playerReducer = (state = initialState, action) => {
    switch(action.type) {
        case REQUEST_CURRENT_PLAYBACK:
            return {
                loading: true
            }
        case RECEIVED_CURRENT_PLAYBACK:
            return {
                loading: false,
                ...action.payload
            }
        default:
            return state
    }
}

export default playerReducer