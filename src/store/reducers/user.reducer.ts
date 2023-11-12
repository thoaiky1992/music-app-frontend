import { USER_ERROR, USER_FETCH, USER_LOADING, USER_LOGOUT } from "@/constants";
import { UserEntity } from "@/entities/user.enity";
import { UserActionType } from "../types/user.type";

export interface IUserReducer {
  user: UserEntity | undefined | null;
  loading: boolean;
  error: string | null;
}
const initialState: IUserReducer = {
  user: null,
  loading: false,
  error: null,
};

export function UserReducer(state = initialState, action: UserActionType) {
  switch (action?.type) {
    case USER_FETCH:
      return { ...state, user: action.payload.user };
    case USER_LOGOUT:
      return { ...state, user: null };
    case USER_LOADING:
      return { ...state, loading: !state.loading, error: null };
    case USER_ERROR:
      return { ...state, error: action.payload.message };
    default:
      return { ...state };
  }
}
