import { CLOSE_MODAL, OPEN_MODAL } from "@/constants";
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
    case OPEN_MODAL:
      return { ...state, isOpen: true };
    case CLOSE_MODAL:
      return { ...state, isOpen: false };
    default:
      return { ...state };
  }
}
