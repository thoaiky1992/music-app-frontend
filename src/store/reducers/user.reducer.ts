import { UserEntity } from "@/entities/user.enity";
import { FETCH_USER, UserActionType } from "../types/user.type";

export interface UserReducerProps {
  user: UserEntity | undefined | null;
}
const initialState: UserReducerProps = {
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
