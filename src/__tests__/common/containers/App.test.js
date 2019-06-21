import React from 'react';
import { shallow } from 'enzyme'
import { App } from 'common/containers/App';


describe('App component should', () => {
    it('render correctly', () => {
        const component = shallow(<App classes={{}} />)
        expect(component).toMatchSnapshot('App filters with no props');
    });
    
})
