import { LOGIN_MODAL_CLOSE, LOGIN_MODAL_OPEN } from "@/constants";

interface OpenModalType {
  type: typeof LOGIN_MODAL_OPEN;
}
interface CloseModalType {
  type: typeof LOGIN_MODAL_CLOSE;
}
export type ModalLoginActionType = OpenModalType | CloseModalType;
