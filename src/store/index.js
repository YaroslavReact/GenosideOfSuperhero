import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from "redux";
import thunk from 'redux-thunk';
import * as gameZone from "./gameZoneStore/actions";
import  gameReducers  from "./gameZoneStore/reducers";

export const actions = {
  gameZone,
}
const rootReducer = combineReducers({
  mainState: gameReducers,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);