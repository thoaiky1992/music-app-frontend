import axiosInstance from "@/config/axios";
import { USER_ERROR, USER_FETCH, USER_LOADING, USER_LOGOUT } from "@/constants";
import { Dispatch } from "redux";
import { ModalLoginActionType } from "../types/modal-login.type";
import { UserActionType } from "../types/user.type";

export const fetchUserAction =
  () => async (dispatch: Dispatch<UserActionType>) => {
    try {
      const res = await axiosInstance.get("/auth/me");
      dispatch({
        type: USER_FETCH,
        payload: {
          user: res.data,
        },
      });
    } catch (error) {
      // console.log(error);
    }
  };

export const loginUserAction =
  (
    payload: { email: string; password: string },
    setErrors: Function,
    resetForm: Function,
    handleCloseModal: Function
  ) =>
  async (dispatch: Dispatch<UserActionType | ModalLoginActionType>) => {
    try {
      dispatch({ type: USER_LOADING });
      const res = await axiosInstance.post("/auth/login", payload);
      if (res.status == 201) {
        localStorage.setItem("access_token", res.data.access_token);
        const res2 = await axiosInstance.get("/auth/me");
        dispatch({
          type: USER_FETCH,
          payload: {
            user: res2.data,
          },
        });
        resetForm();
        handleCloseModal();
      }
    } catch (error) {
      const message = (error as any).response?.data?.message;
      if (error && message) {
        setErrors({ password: message });
        dispatch({ type: USER_ERROR, payload: { message } });
      }
    }
    dispatch({ type: USER_LOADING });
  };

export const userLoadingAction = () => (dispatch: Dispatch<UserActionType>) =>
  dispatch({ type: USER_LOADING });

export const userLogoutAction = () => (dispatch: Dispatch<UserActionType>) => {
  localStorage.removeItem("access_token");
  dispatch({ type: USER_LOGOUT });
};
