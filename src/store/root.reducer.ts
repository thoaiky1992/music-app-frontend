import { combineReducers } from "redux";
import { ModalLoginReducer } from "./reducers/modal.reducer";
import { UserReducer } from "./reducers/user.reducer";

export const rootReducers = combineReducers({
  user: UserReducer,
  modalLogin: ModalLoginReducer,
});
