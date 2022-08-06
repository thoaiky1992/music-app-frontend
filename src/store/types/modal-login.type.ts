import { MODAL_CLOSE, MODAL_OPEN } from "@/constants";

interface OpenModalType {
  type: typeof MODAL_OPEN;
}
interface CloseModalType {
  type: typeof MODAL_CLOSE;
}
export type ModalLoginActionType = OpenModalType | CloseModalType;
