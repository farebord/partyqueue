import axios from 'axios';
import {
  SEARCHING,
  RECEIVED_SEARCH_RESPONSE,
  ERROR_SEARCHING,
  searching,
  receivedSearch,
  errorSearching,
  search,
} from 'common/actions/search';


jest.mock('axios');

describe('search actions should', () => {
  it('contain an action for searching', () => {
    expect(searching()).toEqual({
      type: SEARCHING,
    });
  });

  it('contain an action for fetched data', () => {
    expect(receivedSearch('test')).toEqual({
      type: RECEIVED_SEARCH_RESPONSE,
      payload: 'test',
    });
  });

  it('contain an action for errors', () => {
    expect(errorSearching('test')).toEqual({
      type: ERROR_SEARCHING,
      payload: 'test',
    });
  });
});

// export const search = text => (dispatch) => {
//   dispatch(searching());
//   axios.get(`https://api.spotify.com/v1/search?type=artist,track&q=${text}`)
//     .then(response => response.data)
//     .then(data => dispatch(receivedSearch(data)))
//     .catch(err => dispatch(errorSearching(err)));
// };

describe('search function should', async () => {
  const dispatch = jest.fn();
  axios.get.mockResolvedValueOnce({ data: 'test' });
  await search()(dispatch);
  expect(dispatch).toHaveBeenCalledTimes(2);
  expect(dispatch).toHaveBeenCalledWith({
    type: SEARCHING,
  });
  expect(dispatch).toHaveBeenCalledWith({
    type: RECEIVED_SEARCH_RESPONSE,
    payload: 'test',
  });
})
