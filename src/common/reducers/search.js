import { SEARCHING, RECEIVED_SEARCH_RESPONSE, ERROR_SEARCHING } from '../actions';

const initialState = {
  loading: false,
  fetched: true,
  results: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCHING:
      return {
        loading: true,
        fetched: false,
        results: [],
      };
    case RECEIVED_SEARCH_RESPONSE:
      return {
        loading: false,
        fetched: true,
        results: action.payload,
      };
    case ERROR_SEARCHING:
      return {
        loading: false,
        fetched: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
