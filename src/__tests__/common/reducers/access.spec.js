import reducer from 'common/reducers/access';
import { RECEIVED_ACCESS_INFO, REQUEST_ACCESS_INFO, ERROR_FETCHING_ACCESS_INFO } from 'common/actions/access';

describe('player reducer should', () => {
  it('handle REQUEST_ACCESS_INFO', () => {
    const action = {
      type: REQUEST_ACCESS_INFO,
    };

    expect(reducer({}, action)).toEqual({ loading: true, fetched: false });
  });

  it('handle RECEIVED_ACCESS_INFO', () => {
    const action = {
      type: RECEIVED_ACCESS_INFO,
      payload: { test: 'test' },
    };

    expect(reducer({}, action)).toEqual({ loading: false, fetched: true, test: 'test' });
  });

  it('handle ERROR_FETCHING_ACCESS_INFO', () => {
    const action = {
      type: ERROR_FETCHING_ACCESS_INFO,
      payload: 'test',
    };

    expect(reducer({}, action)).toEqual({ loading: false, fetched: false, error: 'test' });
  });

  it('not handle undefined action', () => {
    expect(reducer('test', {})).toEqual('test');
  });
});
