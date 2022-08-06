import { MODAL_CLOSE, MODAL_OPEN } from "@/constants";
import { Dispatch } from "redux";
import { ModalLoginActionType } from "../types/modal-login.type";

export const openModalLoginAction =
  () => (dispatch: Dispatch<ModalLoginActionType>) =>
    dispatch({ type: MODAL_OPEN });

export const closeModalLoginAction =
  () => (dispatch: Dispatch<ModalLoginActionType>) =>
    dispatch({ type: MODAL_CLOSE });
