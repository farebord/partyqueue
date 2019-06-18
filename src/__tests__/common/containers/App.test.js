import React from 'react';
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import App from 'common/containers/App';
import SearchInput from 'common/components/SearchInput'

const mockStore = configureStore()
const store = mockStore()

describe('App component should', () => {
    it('render correctly', () => {
        const component = shallow(<App store={store} />)
        expect(component).toMatchSnapshot();
    });
    
})
