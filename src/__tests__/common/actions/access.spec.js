import axios from 'axios';
import {
  REQUEST_ACCESS_INFO,
  RECEIVED_ACCESS_INFO,
  ERROR_FETCHING_ACCESS_INFO,
  fetchAccessInfo,
  fetchingAccessInfo,
  fetchedAccessInfo,
  errorFetching,
} from 'common/actions/access';

jest.mock('axios');

describe('access actions should', () => {
  it('contain an action for fetching', () => {
    expect(fetchingAccessInfo()).toEqual({
      type: REQUEST_ACCESS_INFO,
    });
  });

  it('contain an action for fetched data', () => {
    expect(fetchedAccessInfo('test')).toEqual({
      type: RECEIVED_ACCESS_INFO,
      payload: 'test',
    });
  });

  it('contain an action for errors', () => {
    expect(errorFetching('test')).toEqual({
      type: ERROR_FETCHING_ACCESS_INFO,
      payload: 'test',
    });
  });
});

describe('fetchAccessInfo should', () => {
  it('dispatch fetchedAccessInfo if request was successful', async () => {
    const dispatch = jest.fn();
    axios.get.mockResolvedValueOnce({ data: 'test' });
    await fetchAccessInfo()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: REQUEST_ACCESS_INFO,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: RECEIVED_ACCESS_INFO,
      payload: 'test',
    });
  });

  it('dispatch errorFetching if request was unsuccessful', async () => {
    const dispatch = jest.fn();
    axios.get.mockRejectedValueOnce('test');
    await fetchAccessInfo()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: REQUEST_ACCESS_INFO,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ERROR_FETCHING_ACCESS_INFO,
      payload: 'test',
    });
  });
});
