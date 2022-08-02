import { CLOSE_MODAL, OPEN_MODAL } from "@/constants";

interface OpenModalType {
  type: typeof OPEN_MODAL;
}
interface CloseModalType {
  type: typeof CLOSE_MODAL;
}
export type ModalLoginActionType = OpenModalType | CloseModalType;
