import React from 'react';
import { shallow } from 'enzyme'
import SearchResults from 'common/components/SearchResults'


describe('SearchInput component should', () => {
    it('render correctly', () => {
        const component = shallow(<SearchResults />)
        expect(component).toMatchSnapshot('SearchInput renders without props');
    });
    
})
