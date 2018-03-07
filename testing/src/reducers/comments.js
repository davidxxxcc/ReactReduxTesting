import { SAVE_COMMENT } from '../actions/types'

export default function(state=[], action) {
    switch(action.type) {
        case SAVE_COMMENT:
        // return state.concat([action.payload]);  // array merging
        return [...state, action.payload];
    }
    return state;
}