import { RECEIVED_ACCESS_INFO, REQUEST_ACCESS_INFO, ERROR_FETCHING_ACCESS_INFO } from '../actions';

const initialState = {
  loading: false,
  fetched: false,
};

const accessReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ACCESS_INFO:
      return {
        loading: true,
        fetched: false,
      };
    case RECEIVED_ACCESS_INFO:
      return {
        loading: false,
        fetched: true,
        ...action.payload,
      };
    case ERROR_FETCHING_ACCESS_INFO:
      return {
        loading: false,
        fetched: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default accessReducer;
