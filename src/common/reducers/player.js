import { REQUEST_CURRENT_PLAYBACK, RECEIVED_CURRENT_PLAYBACK, ERROR_FETCHING_CURRENT_PLAYBACK, SWITCH_PLAYING } from '../actions'

const initialState = {
    loading: false,
    fetched: false,
    playbackSwitching: false
}

const playerReducer = (state = initialState, action) => {
    switch(action.type) {
        case REQUEST_CURRENT_PLAYBACK:
            return {
                ...state,
                loading: true,
            }
        case RECEIVED_CURRENT_PLAYBACK:
            return {
                loading: false,
                fetched: true,
                playbackSwitching: false,
                ...action.payload
            }
        case ERROR_FETCHING_CURRENT_PLAYBACK:
            return {
                loading: false,
                fetched: false,
                error: action.payload,
                playbackSwitching: true
            }
        case SWITCH_PLAYING:
            return {
                ...state,
                playbackSwitching: true
            }
        default:
            return state
    }
}

export default playerReducer