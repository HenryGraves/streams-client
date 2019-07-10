/**
 * @name streamReducer.js
 * @description stream reducer
 */
import _ from 'lodash'

import { 
  EDIT_STREAM,
  CREATE_STREAM,
  FETCH_STREAM, 
  FETCH_STREAMS, // notice the plural
  DELETE_STREAM
} from '../actions/types';


export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return {
        ...state,
        ..._.mapKeys(action.payload, 'id')
      }
    case FETCH_STREAM || CREATE_STREAM || EDIT_STREAM:
      return {
        ...state,
        [action.payload.id]: action.payload
      }
    case DELETE_STREAM:
      // omit creates a new object
      return _.omit(state, action.payload);  
  default:
    return state
  }
}

