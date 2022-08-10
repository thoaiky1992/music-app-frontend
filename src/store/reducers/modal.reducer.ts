import { LOGIN_MODAL_CLOSE, LOGIN_MODAL_OPEN } from "@/constants";
import { ModalLoginActionType } from "../types/modal-login.type";

export interface IModalLoginReducer {
  isOpen: boolean;
}
const initialState: IModalLoginReducer = {
  isOpen: false,
};

export function ModalLoginReducer(
  state = initialState,
  action: ModalLoginActionType
) {
  switch (action?.type) {
    case LOGIN_MODAL_OPEN:
      return { ...state, isOpen: true };
    case LOGIN_MODAL_CLOSE:
      return { ...state, isOpen: false };
    default:
      return { ...state };
  }
}
