import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";

import thunk from "redux-thunk";
import { rootReducers } from "./root.reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "react";
import { fetchUserAction } from "./actions/user.actions";
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const middlewares = [thunk];
const enhancers = [applyMiddleware(...middlewares)];
const store = createStore(rootReducers, composeEnhancers(...enhancers));

export type AppDispatch = typeof store.dispatch | Dispatch<any>;
export type RootState = ReturnType<typeof rootReducers>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

(async () => {
  await store.dispatch(fetchUserAction() as any);
})();

export default store;
