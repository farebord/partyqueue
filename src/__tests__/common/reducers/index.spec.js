import { createStore } from 'redux';
import rootReducer from 'common/reducers';

describe('root reducer should', () => {
  it('have initial state', () => {
    const store = createStore(rootReducer);
    expect(store.getState().search).toEqual({ loading: false, fetched: true, results: [] });
    expect(store.getState().player).toEqual(
      { loading: false, fetched: false, playbackSwitching: false },
    );
    expect(store.getState().access).toEqual({ loading: false, fetched: false });
  });
});
