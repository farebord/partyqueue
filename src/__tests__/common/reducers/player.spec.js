import reducer from 'common/reducers/player';
import {
  REQUEST_CURRENT_PLAYBACK, RECEIVED_CURRENT_PLAYBACK, ERROR_FETCHING_CURRENT_PLAYBACK,
  SWITCH_PLAYING,
} from 'common/actions/player';

describe('player reducer should', () => {
  it('handle REQUEST_CURRENT_PLAYBACK', () => {
    const action = {
      type: REQUEST_CURRENT_PLAYBACK,
    };

    expect(reducer({}, action)).toEqual({ loading: true });
  });

  it('handle REQUEST_CURRENT_PLAYBACK with non initial state', () => {
    const action = {
      type: REQUEST_CURRENT_PLAYBACK,
    };

    expect(reducer({ something: true }, action)).toEqual({ loading: true, something: true });
  });

  it('handle RECEIVED_CURRENT_PLAYBACK', () => {
    const action = {
      type: RECEIVED_CURRENT_PLAYBACK,
      payload: { test: 'test' },
    };

    expect(reducer({}, action)).toEqual({
      loading: false, fetched: true, playbackSwitching: false, test: 'test',
    });
  });

  it('handle ERROR_FETCHING_CURRENT_PLAYBACK', () => {
    const action = {
      type: ERROR_FETCHING_CURRENT_PLAYBACK,
      payload: 'test',
    };

    expect(reducer({}, action)).toEqual({
      loading: false, fetched: false, playbackSwitching: true, error: 'test',
    });
  });

  it('handle SWITCH_PLAYING', () => {
    const action = {
      type: SWITCH_PLAYING,
    };

    expect(reducer({}, action)).toEqual({ playbackSwitching: true });
  });

  it('handle SWITCH_PLAYING with non initial state', () => {
    const action = {
      type: SWITCH_PLAYING,
    };

    expect(reducer({ something: true }, action)).toEqual(
      { playbackSwitching: true, something: true },
    );
  });

  it('not handle undefined action', () => {
    expect(reducer('test', {})).toEqual('test');
  });
});
