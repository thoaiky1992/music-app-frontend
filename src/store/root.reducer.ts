import { combineReducers } from "redux";
import { UserReducer } from "./reducers/user.reducer";

export const rootReducers = combineReducers({
  user: UserReducer,
});
