// user reducer
export const USER_FETCH = "USER_FETCH";
export const USER_LOADING = "USER_LOADING";
export const USER_LOGIN = "USER_LOGIN";
export const USER_ERROR = "USER_ERROR";
export const USER_LOGOUT = "USER_LOGOUT";

// modal reducer
export const MODAL_OPEN = "MODAL_OPEN";
export const MODAL_CLOSE = "MODAL_CLOSE";

// play list reducer
export const IS_TOGGLE_CONTROL = "IS_TOGGLE_CONTROL";
export const IS_TOOGLE_PLAY = "IS_TOOGLE_PLAY";
export const ADD_SONG_TO_PLAY_LIST = "ADD_SONG_TO_PLAY_LIST";
export const UPDATE_INDEX = "UPDATE_INDEX";
export const INCREMENT_INDEX = "INCREMENT_INDEX";
export const DECREMENT_INDEX = "DECREMENT_INDEX";
export const IS_TOGGLE_REPEAT = "IS_TOGGLE_REPEAT";

//Swiper
export const SWIPER_NEW_MUSIC_BREAK_POINTS = {
  1: {
    slidesPerView: 2,
    spaceBetween: 2,
  },
  320: {
    slidesPerView: 2,
  },
  480: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
  1280: {
    slidesPerView: 5,
  },
  1900: {
    slidesPerView: 8,
  },
};
export const SONG_DEFAULT = {
  _id: "default",
  title: "default",
  artists: "default",
  slug: "default",
  image: "default",
  src: "anh-la-cua-em.mp3",
  views: 0,
  likes: 0,
  genre: "default",
};

export const DEFAULT_SONG_TIME = { currentTime: "00:00", allTime: "00:00" };
