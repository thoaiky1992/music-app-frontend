import {
  ADD_SONG_TO_PLAY_LIST,
  DECREMENT_INDEX,
  INCREMENT_INDEX,
  IS_TOGGLE_CONTROL,
  IS_TOGGLE_PLAY_PLIST_MODAL,
  IS_TOGGLE_RANDOM,
  IS_TOGGLE_REPEAT,
  IS_TOOGLE_PLAY,
  UPDATE_INDEX,
  UPDATE_IS_OPEN_PLAY_PLIST_MODAL,
} from "@/constants";
import { MusicEntity } from "@/entities/music.entity";

interface IsToggleOpenControlType {
  type: typeof IS_TOGGLE_CONTROL;
}
interface ToggleIsPlayType {
  type: typeof IS_TOOGLE_PLAY;
}

interface AddSongToPlayListType {
  type: typeof ADD_SONG_TO_PLAY_LIST;
  payload: {
    songs: Array<MusicEntity>;
  };
}
interface UpdateIndexType {
  type: typeof UPDATE_INDEX;
  payload: {
    newIndex: number;
  };
}

interface IncrementIndexType {
  type: typeof INCREMENT_INDEX;
}

interface DecrementInexType {
  type: typeof DECREMENT_INDEX;
}

interface IsToggleOpenReapeatType {
  type: typeof IS_TOGGLE_REPEAT;
}

interface IsToggleOpenPlayListModaltType {
  type: typeof IS_TOGGLE_PLAY_PLIST_MODAL;
}

interface UpdateIsOpenPlayListModaltType {
  type: typeof UPDATE_IS_OPEN_PLAY_PLIST_MODAL;
  payload: {
    newIsOpen: boolean;
  };
}

interface IsToggleRandomType {
  type: typeof IS_TOGGLE_RANDOM;
}
export type PlayListActionType =
  | IsToggleOpenControlType
  | ToggleIsPlayType
  | AddSongToPlayListType
  | UpdateIndexType
  | IncrementIndexType
  | DecrementInexType
  | IsToggleOpenReapeatType
  | IsToggleOpenPlayListModaltType
  | UpdateIsOpenPlayListModaltType
  | IsToggleRandomType;
