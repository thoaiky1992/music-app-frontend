import { USER_ERROR, USER_FETCH, USER_LOADING, USER_LOGOUT } from "@/constants";
import { UserEntity } from "@/entities/user.enity";

interface fetchUserType {
  type: typeof USER_FETCH;
  payload: {
    user: UserEntity | undefined | null;
  };
}
interface userErrorType {
  type: typeof USER_ERROR;
  payload: {
    message: string;
  };
}
interface userLoadingType {
  type: typeof USER_LOADING;
}

interface userLogoutType {
  type: typeof USER_LOGOUT;
}

export type UserActionType =
  | fetchUserType
  | userLoadingType
  | userErrorType
  | userLogoutType;
