import { CLOSE_MODAL, OPEN_MODAL } from "@/constants";
import { Dispatch } from "redux";
import { ModalLoginActionType } from "../types/modal-login.type";

export const openModalLoginAction =
  () => (dispatch: Dispatch<ModalLoginActionType>) =>
    dispatch({ type: OPEN_MODAL });

export const closeModalLoginAction =
  () => (dispatch: Dispatch<ModalLoginActionType>) =>
    dispatch({ type: CLOSE_MODAL });
