import {SET_ALERT, REMOVE_ALERT}  from '../actions/types';
const initalState = [];
export default function(state= initalState, action){
const { type, payload }=action;

switch(type) {
// : because it  is js switch,switch is mutable
    case SET_ALERT:
    return [...state, payload];
    case REMOVE_ALERT:
        //filter because we want to remove specific alert,so we are sending along id
        //if alert id != payload
    return state.filter(alert =>alert.id !== payload);
    default:
        return state;
}
}