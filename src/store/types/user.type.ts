import { UserEntity } from "@/entities/user.enity";

export const FETCH_USER = "FETCH_USER";

interface fetchUserType {
  type: typeof FETCH_USER;
  payload: {
    user: UserEntity | undefined | null;
  };
}
export type UserActionType = fetchUserType;
