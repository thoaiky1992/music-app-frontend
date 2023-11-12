import { useLocalStorage } from "@/composables/useLocalStorage";
import axiosInstance from "@/config/axios";
import {
  ACCESS_TOKEN,
  USER_ERROR,
  USER_FETCH,
  USER_LOADING,
  USER_LOGOUT,
} from "@/constants";
import { NavigateFunction } from "react-router";
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
    handleCloseModal?: Function | null,
    navigate?: NavigateFunction
  ) =>
  async (dispatch: Dispatch<UserActionType | ModalLoginActionType>) => {
    const tokenStorage = useLocalStorage(ACCESS_TOKEN);
    try {
      dispatch({ type: USER_LOADING });
      const res = await axiosInstance.post("/auth/login", payload);
      if (res.status == 201) {
        tokenStorage.setItem(JSON.stringify(res.data.access_token));
        const res2 = await axiosInstance.get("/auth/me");
        dispatch({
          type: USER_FETCH,
          payload: {
            user: res2.data,
          },
        });
        resetForm();
        if (handleCloseModal) handleCloseModal();
        if (navigate) navigate("/");
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

export const updateUserAction =
  (payload: any, setErrors: Function, resetForm: Function, toast: any) =>
  async (dispatch: Dispatch<UserActionType | ModalLoginActionType>) => {
    const tokenStorage = useLocalStorage(ACCESS_TOKEN);
    try {
      dispatch({ type: USER_LOADING });
      const res = await axiosInstance.post("/auth/update-user", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status == 201) {
        tokenStorage.setItem(JSON.stringify(res.data.access_token));
        const res2 = await axiosInstance.get("/auth/me");
        dispatch({
          type: USER_FETCH,
          payload: {
            user: res2.data,
          },
        });
        resetForm();
        toast.success("Cập nhật thành công !!!");
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
  useLocalStorage(ACCESS_TOKEN).removeItem();
  dispatch({ type: USER_LOGOUT });
};
