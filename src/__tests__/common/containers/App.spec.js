import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow, render } from 'enzyme'
import { App } from 'common/containers/App';
import { Provider } from 'react-redux'
import configureStore from 'common/store/configureStore';
import SearchInput from 'common/components/SearchInput'
import PlayerControls from 'common/components/PlayerControls'


describe('App component should', () => {
    it('render correctly', () => {
        const component = shallow(<App classes={{}} />)
        expect(component).toMatchSnapshot('App filters with no props');
    });

    it('render SearchInput', () => {
        const component = shallow(<App classes={{}} />)
        const searchInput = component.find(SearchInput)
        expect(searchInput).toHaveLength(1)
    })

    it('render PlayerControls', () => {
        const component = shallow(<App classes={{}} />)
        const playerControls = component.find(PlayerControls)
        expect(playerControls).toHaveLength(1)
    })

    it('call getInitialData when mounted', () => {
        const mock = jest.fn()
        let container = document.createElement('div');
        act(() => {
            ReactDOM.render(<Provider store={configureStore()}><App getInitialData={mock} classes={{}}/></Provider>, container)
        })
        expect(mock).toHaveBeenCalledTimes(1)  
    })
    
})
