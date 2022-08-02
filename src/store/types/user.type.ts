import { FETCH_USER } from "@/constants";
import { UserEntity } from "@/entities/user.enity";

interface fetchUserType {
  type: typeof FETCH_USER;
  payload: {
    user: UserEntity | undefined | null;
  };
}
export type UserActionType = fetchUserType;
