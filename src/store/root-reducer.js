import { combineReducers } from "redux";
import  gameReducers  from "./reducers/reducers";

export const rootReducer = combineReducers({
  mainState: gameReducers,
});