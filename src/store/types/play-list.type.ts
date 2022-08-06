import {
  ADD_SONG_TO_PLAY_LIST,
  DECREMENT_INDEX,
  INCREMENT_INDEX,
  IS_TOGGLE_CONTROL,
  IS_TOGGLE_REPEAT,
  IS_TOOGLE_PLAY,
  UPDATE_INDEX,
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
interface updateIndexType {
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
export type PlayListActionType =
  | IsToggleOpenControlType
  | ToggleIsPlayType
  | AddSongToPlayListType
  | updateIndexType
  | IncrementIndexType
  | DecrementInexType
  | IsToggleOpenReapeatType;
