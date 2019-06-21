import React from 'react';
import { shallow } from 'enzyme'
import SearchInput from 'common/components/SearchInput'


describe('SearchInput component should', () => {
    it('render correctly', () => {
        const component = shallow(<SearchInput />)
        expect(component).toMatchSnapshot('SearchInput renders without props');
    });
    
})
