import axios from "axios";
import config from "../../server/config"

export const REQUEST_CURRENT_PLAYBACK = 'REQUEST_CURRENT_PLAYBACK';
export const RECEIVED_CURRENT_PLAYBACK = 'RECEIVED_CURRENT_PLAYBACK';
export const ERROR_FETCHING_CURRENT_PLAYBACK = 'ERROR_FETCHING_CURRENT_PLAYBACK';
export const SWITCH_PLAYING = 'SWITCH_PLAYING';

const fetchingCurrentPlayback = () => ({
    type: REQUEST_CURRENT_PLAYBACK
})

const loadCurrentPlayback = data => ({
    type: RECEIVED_CURRENT_PLAYBACK,
    payload: data
})

const errorFetching = error => ({
    type: ERROR_FETCHING_CURRENT_PLAYBACK,
    payload: error
})

const switchResumePause = () => ({
    type: SWITCH_PLAYING
})

export const fetchCurrentPlayback = () => {
    return dispatch => {
        dispatch(fetchingCurrentPlayback())
        axios.get(`http://${config.host}${config.port !== 80 && `:${config.port}`}/playing`)
            .then(response => response.data)
            .then(data => dispatch(loadCurrentPlayback(data)))
            .catch(err => dispatch(errorFetching(err)))
    }
}

export const switchPlaying = () => {
    return (dispatch, getState) => {
        const {player} = getState()
        dispatch(switchResumePause())
        axios.get(`http://${config.host}${config.port !== 80 && `:${config.port}`}/${player.is_playing ? 'pause' : 'resume'}`)
            .then(() => dispatch(fetchCurrentPlayback()))
            .catch(err => console.log(err))
    }
}