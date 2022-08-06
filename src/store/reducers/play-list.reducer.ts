import {
  IS_TOOGLE_PLAY,
  IS_TOGGLE_CONTROL,
  SONG_DEFAULT,
  ADD_SONG_TO_PLAY_LIST,
  UPDATE_INDEX,
  INCREMENT_INDEX,
  DECREMENT_INDEX,
  IS_TOGGLE_REPEAT,
  IS_TOGGLE_PLAY_PLIST_MODAL,
  UPDATE_IS_OPEN_PLAY_PLIST_MODAL,
} from "@/constants";
import { MusicEntity } from "@/entities/music.entity";
import { PlayListActionType } from "../types/play-list.type";

export interface IPlayListReducer {
  list: MusicEntity[];
  isOpenControl: boolean;
  isPlay: boolean;
  index: number;
  isRepeat: boolean;
  isOpenPlayListModal: boolean;
}
const initialState: IPlayListReducer = {
  list: [SONG_DEFAULT],
  isOpenControl: false,
  isPlay: false,
  index: 0,
  isRepeat: false,
  isOpenPlayListModal: false,
};

export function PlayListReducer(
  state = initialState,
  action: PlayListActionType
) {
  switch (action?.type) {
    case IS_TOGGLE_CONTROL:
      return { ...state, isOpenControl: !state.isOpenControl };
    case IS_TOOGLE_PLAY:
      return { ...state, isPlay: !state.isPlay };
    case UPDATE_INDEX:
      return { ...state, index: action.payload.newIndex };
    case INCREMENT_INDEX:
      return {
        ...state,
        index: ++state.index > state.list.length - 1 ? 0 : state.index,
      };
    case DECREMENT_INDEX:
      return {
        ...state,
        index: --state.index < 0 ? state.list.length - 1 : state.index,
      };
    case IS_TOGGLE_REPEAT:
      return { ...state, isRepeat: !state.isRepeat };
    case IS_TOGGLE_PLAY_PLIST_MODAL:
      return { ...state, isOpenPlayListModal: !state.isOpenPlayListModal };
    case UPDATE_IS_OPEN_PLAY_PLIST_MODAL:
      return { ...state, isOpenPlayListModal: action.payload.newIsOpen };
    case ADD_SONG_TO_PLAY_LIST:
      return {
        ...state,
        list: action.payload.songs,
        isOpenControl: true,
        isPlay: true,
        isOpenPlayListModal: false,
        index: 0,
      };
    default:
      return { ...state };
  }
}
