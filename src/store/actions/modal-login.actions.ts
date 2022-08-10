import { LOGIN_MODAL_CLOSE, LOGIN_MODAL_OPEN } from "@/constants";
import { Dispatch } from "redux";
import { ModalLoginActionType } from "../types/modal-login.type";

export const openModalLoginAction =
  () => (dispatch: Dispatch<ModalLoginActionType>) =>
    dispatch({ type: LOGIN_MODAL_OPEN });

export const closeModalLoginAction =
  () => (dispatch: Dispatch<ModalLoginActionType>) =>
    dispatch({ type: LOGIN_MODAL_CLOSE });
