import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme'
import { App, mapDispatchToProps } from 'common/containers/App';
import { Provider } from 'react-redux'
import configureStore from 'common/store/configureStore';
import SearchInput from 'common/components/SearchInput'
import PlayerControls from 'common/components/PlayerControls'

import { fetchAccessInfo, fetchCurrentPlayback } from 'common/actions'

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

    it('call getAccessInfo when mounted', () => {
        const mock = jest.fn()
        let container = document.createElement('div');
        act(() => {
            ReactDOM.render(<Provider store={configureStore()}><App getAccessInfo={mock} classes={{}}/></Provider>, container)
        })
        expect(mock).toHaveBeenCalledTimes(1)  
    })
})

describe('App mapDispatchToProps should', () => {
    it('dispatch fetchAccessInfo when getAccessInfo its called', () => {
        const dispatch = jest.fn()
        fetchAccessInfo.mockReturnValueOnce({test: true})
        mapDispatchToProps(dispatch).getAccessInfo()
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toBeCalledWith({test: true})
    })

    it('dispatch fetchCurrentPlayback when getPlayingInfo its called', () => {
        const dispatch = jest.fn()
        fetchCurrentPlayback.mockReturnValueOnce({test: true})
        mapDispatchToProps(dispatch).getPlayingInfo()
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toBeCalledWith({test: true})
    })
})
