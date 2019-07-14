import axios from 'axios';
import config from '../../server/config';

export const REQUEST_CURRENT_PLAYBACK = 'REQUEST_CURRENT_PLAYBACK';
export const RECEIVED_CURRENT_PLAYBACK = 'RECEIVED_CURRENT_PLAYBACK';
export const ERROR_FETCHING_CURRENT_PLAYBACK = 'ERROR_FETCHING_CURRENT_PLAYBACK';
export const SWITCH_PLAYING = 'SWITCH_PLAYING';

export const fetchingCurrentPlayback = () => ({
  type: REQUEST_CURRENT_PLAYBACK,
});

export const loadCurrentPlayback = data => ({
  type: RECEIVED_CURRENT_PLAYBACK,
  payload: data,
});

export const errorFetching = error => ({
  type: ERROR_FETCHING_CURRENT_PLAYBACK,
  payload: error,
});

export const switchResumePause = () => ({
  type: SWITCH_PLAYING,
});

export const fetchCurrentPlayback = () => async (dispatch) => {
  try {
    dispatch(fetchingCurrentPlayback());
    const response = await axios.get(`http://${config.host}${config.port !== 80 && `:${config.port}`}/playing`);
    return dispatch(loadCurrentPlayback(response.data));
  } catch (error) {
    return dispatch(errorFetching(error));
  }
};

export const switchPlaying = () => async (dispatch, getState) => {
  try {
    const { player } = getState();
    dispatch(switchResumePause());
    await axios.get(`http://${config.host}${config.port !== 80 && `:${config.port}`}/${player.is_playing ? 'pause' : 'resume'}`);
    return dispatch(fetchCurrentPlayback());
  } catch (error) {
    return dispatch(errorFetching(error));
  }
};
