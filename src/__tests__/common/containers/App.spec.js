import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme'
import { App, mapDispatchToProps } from 'common/containers/App';
import { Provider } from 'react-redux'
import configureStore from 'common/store/configureStore';
import SearchInput from 'common/components/SearchInput'
import PlayerControls from 'common/components/PlayerControls'

import * as actions from 'common/actions'

jest.mock('common/actions')


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

describe('App mapDispatchToProps should', () => {
    it('fetch access info and current playback when getInitialData its called', () => {
        const dispatch = jest.fn()
        actions.fetchAccessInfo = jest.fn(() => ({test: true}))
        actions.fetchCurrentPlayback = jest.fn(() => ({test2: true}))
        mapDispatchToProps(dispatch).getInitialData()
        expect(dispatch).toHaveBeenCalledTimes(2)
        expect(dispatch).toBeCalledWith({test: true})
        expect(dispatch).toBeCalledWith({test2: true})
    })
})
