import axiosInstance from "@/config/axios";
import { Dispatch } from "redux";
import { FETCH_USER, UserActionType } from "../types/user.type";

export const fetchUserAction =
  () => async (dispatch: Dispatch<UserActionType>) => {
    try {
      const res = await axiosInstance.get("/auth/me");
      dispatch({
        type: FETCH_USER,
        payload: {
          user: res.data,
        },
      });
    } catch (error) {
      // console.log(error);
    }
  };
