import { FETCH_USER } from "@/constants";
import { UserEntity } from "@/entities/user.enity";
import { UserActionType } from "../types/user.type";

export interface IUserReducer {
  user: UserEntity | undefined | null;
}
const initialState: IUserReducer = {
  user: null,
};

export function UserReducer(state = initialState, action: UserActionType) {
  switch (action?.type) {
    case FETCH_USER:
      return { ...state, user: action.payload.user };
    default:
      return { ...state };
  }
}
