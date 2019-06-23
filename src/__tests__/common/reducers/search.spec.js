import reducer from 'common/reducers/search'
import { SEARCHING, RECEIVED_SEARCH_RESPONSE, ERROR_SEARCHING  } from 'common/actions/search'

describe('player reducer should', () => {
    it('handle SEARCHING', () => {
        const action = {
            type: SEARCHING
        }

        expect(reducer({}, action)).toEqual({loading: true, fetched: false, results: []})
    })

    it('handle RECEIVED_SEARCH_RESPONSE', () => {
        const action = {
            type: RECEIVED_SEARCH_RESPONSE,
            payload: "something"
        }

        expect(reducer({}, action)).toEqual({loading: false, fetched: true, results: "something"})
    })
    
    it('handle ERROR_SEARCHING', () => {
        const action = {
            type: ERROR_SEARCHING,
            payload: "test"
        }

        expect(reducer({}, action)).toEqual({loading: false, fetched: false, error: "test"})
    })

    it('not handle undefined action', ()=> {
        expect(reducer('test', {})).toEqual('test')
    })
})