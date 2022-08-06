import { MODAL_CLOSE, MODAL_OPEN } from "@/constants";
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
    case MODAL_OPEN:
      return { ...state, isOpen: true };
    case MODAL_CLOSE:
      return { ...state, isOpen: false };
    default:
      return { ...state };
  }
}
