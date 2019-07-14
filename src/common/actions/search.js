import axios from 'axios';

export const SEARCHING = 'SEARCHING';
export const RECEIVED_SEARCH_RESPONSE = 'RECEIVED_SEARCH_RESPONSE';
export const ERROR_SEARCHING = 'ERROR_SEARCHING';

export const searching = () => ({
  type: SEARCHING,
});

export const receivedSearch = data => ({
  type: RECEIVED_SEARCH_RESPONSE,
  payload: data,
});

export const errorSearching = error => ({
  type: ERROR_SEARCHING,
  payload: error,
});

export const search = text => async (dispatch) => {
  try {
    dispatch(searching());
    const response = await axios.get(`https://api.spotify.com/v1/search?type=artist,track&q=${text}`);
    return dispatch(receivedSearch(response.data));
  } catch (error) {
    return dispatch(errorSearching(error));
  }
};
