import axios from 'axios';
import {
  REQUEST_CURRENT_PLAYBACK,
  RECEIVED_CURRENT_PLAYBACK,
  ERROR_FETCHING_CURRENT_PLAYBACK,
  SWITCH_PLAYING,
  fetchingCurrentPlayback,
  loadCurrentPlayback,
  errorFetching,
  switchResumePause,
  fetchCurrentPlayback,
  switchPlaying,
} from 'common/actions/player';


jest.mock('axios');

describe('player actions should', () => {
  it('contain an action for fetching', () => {
    expect(fetchingCurrentPlayback()).toEqual({
      type: REQUEST_CURRENT_PLAYBACK,
    });
  });

  it('contain an action for fetched data', () => {
    expect(loadCurrentPlayback('test')).toEqual({
      type: RECEIVED_CURRENT_PLAYBACK,
      payload: 'test',
    });
  });

  it('contain an action for errors', () => {
    expect(errorFetching('test')).toEqual({
      type: ERROR_FETCHING_CURRENT_PLAYBACK,
      payload: 'test',
    });
  });

  it('contain an action for switch playing', () => {
    expect(switchResumePause()).toEqual({
      type: SWITCH_PLAYING,
    });
  });
});

describe('fetchCurrentPlayback should', () => {
  it('dispatch fetchedAccessInfo if request was successful', async () => {
    const dispatch = jest.fn();
    axios.get.mockResolvedValueOnce({ data: 'test' });
    await fetchCurrentPlayback()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: REQUEST_CURRENT_PLAYBACK,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: RECEIVED_CURRENT_PLAYBACK,
      payload: 'test',
    });
  });

  it('dispatch errorFetching if request was unsuccessful', async () => {
    const dispatch = jest.fn();
    axios.get.mockRejectedValueOnce('test');
    await fetchCurrentPlayback()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: REQUEST_CURRENT_PLAYBACK,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ERROR_FETCHING_CURRENT_PLAYBACK,
      payload: 'test',
    });
  });
});

describe('switchPlaying should', () => {
  it('dispatch switchPlaying if request was successful', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ player: '' }));
    axios.get.mockResolvedValueOnce('test');
    await switchPlaying()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: SWITCH_PLAYING,
    });
  });

  it('dispatch switchPlaying if request was unsuccessful', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ player: '' }));
    axios.get.mockRejectedValueOnce('test');
    await switchPlaying()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: SWITCH_PLAYING,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ERROR_FETCHING_CURRENT_PLAYBACK,
      payload: 'test',
    });
  });
});
