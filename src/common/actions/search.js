import axios from 'axios';

export const SEARCHING = 'SEARCHING';
export const RECEIVED_SEARCH_RESPONSE = 'RECEIVED_SEARCH_RESPONSE';
export const ERROR_SEARCHING = 'ERROR_SEARCHING';

const searching = () => ({
  type: SEARCHING,
});

const receivedSearch = data => ({
  type: RECEIVED_SEARCH_RESPONSE,
  payload: data,
});

const errorSearching = error => ({
  type: ERROR_SEARCHING,
  payload: error,
});

export const search = text => (dispatch) => {
  dispatch(searching());
  axios.get(`https://api.spotify.com/v1/search?type=artist,track&q=${text}`)
    .then(response => response.data)
    .then(data => dispatch(receivedSearch(data)))
    .catch(err => dispatch(errorSearching(err)));
};
