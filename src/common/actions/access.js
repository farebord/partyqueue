import axios from 'axios';
import config from '../../server/config';

export const REQUEST_ACCESS_INFO = 'REQUEST_ACCESS_INFO';
export const RECEIVED_ACCESS_INFO = 'RECEIVED_ACCESS_INFO';
export const ERROR_FETCHING_ACCESS_INFO = 'ERROR_FETCHING_ACCESS_INFO';

export const fetchingAccessInfo = () => ({
  type: REQUEST_ACCESS_INFO,
});

export const fetchedAccessInfo = data => ({
  type: RECEIVED_ACCESS_INFO,
  payload: data,
});

export const errorFetching = error => ({
  type: ERROR_FETCHING_ACCESS_INFO,
  payload: error,
});


export const fetchAccessInfo = () => async (dispatch) => {
  try {
    dispatch(fetchingAccessInfo());
    const accessInfo = await axios.get(`http://${config.host}${config.port !== 80 && `:${config.port}`}/access_info`);
    return dispatch(fetchedAccessInfo(accessInfo.data));
  } catch (error) {
    return dispatch(errorFetching(error));
  }
};
