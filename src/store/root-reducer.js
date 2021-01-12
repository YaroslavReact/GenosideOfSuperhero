import { combineReducers } from "redux";
import  gameReducers  from "./gameZoneStore/reducers";

export const rootReducer = combineReducers({
  mainState: gameReducers,
});