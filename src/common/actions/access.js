import axios from 'axios';
import config from '../../server/config';

export const REQUEST_ACCESS_INFO = 'REQUEST_ACCESS_INFO';
export const RECEIVED_ACCESS_INFO = 'RECEIVED_ACCESS_INFO';
export const ERROR_FETCHING_ACCESS_INFO = 'ERROR_FETCHING_ACCESS_INFO';

export const fetchingAccessInfo = () => ({
  type: REQUEST_ACCESS_INFO,
});

const fetchedAccessInfo = data => ({
  type: RECEIVED_ACCESS_INFO,
  payload: data,
});

const errorFetching = error => ({
  type: ERROR_FETCHING_ACCESS_INFO,
  payload: error,
});


export const fetchAccessInfo = () => (dispatch) => {
  dispatch(fetchingAccessInfo());
  axios.get(`http://${config.host}${config.port !== 80 && `:${config.port}`}/access_info`)
    .then(response => response.data)
    .then(data => dispatch(fetchedAccessInfo(data)))
    .catch(err => dispatch(errorFetching(err)));
};
