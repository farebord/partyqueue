import axios from "axios";
import config from "../../server/config"

export const SEARCHING = 'SEARCHING';
export const RECEIVED_SEARCH_RESPONSE = 'RECEIVED_SEARCH_RESPONSE';
export const ERROR_SEARCHING = 'ERROR_SEARCHING';

const searching = () => ({
    type: SEARCHING
})

const receivedSearch = data => ({
    type: RECEIVED_SEARCH_RESPONSE,
    payload: data
})

const errorSearching = error => ({
    type: ERROR_SEARCHING,
    payload: error
})