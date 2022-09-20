export const DEFAULT = "default";

// user reducer
export const USER_FETCH = "USER_FETCH";
export const USER_LOADING = "USER_LOADING";
export const USER_LOGIN = "USER_LOGIN";
export const USER_ERROR = "USER_ERROR";
export const USER_LOGOUT = "USER_LOGOUT";

// modal login reducer
export const LOGIN_MODAL_OPEN = "LOGIN_MODAL_OPEN";
export const LOGIN_MODAL_CLOSE = "LOGIN_MODAL_CLOSE";

// play list reducer
export const IS_TOGGLE_CONTROL = "IS_TOGGLE_CONTROL";
export const IS_TOOGLE_PLAY = "IS_TOOGLE_PLAY";
export const ADD_SONG_TO_PLAY_LIST = "ADD_SONG_TO_PLAY_LIST";
export const UPDATE_INDEX = "UPDATE_INDEX";
export const INCREMENT_INDEX = "INCREMENT_INDEX";
export const DECREMENT_INDEX = "DECREMENT_INDEX";
export const IS_TOGGLE_REPEAT = "IS_TOGGLE_REPEAT";
export const IS_TOGGLE_PLAY_PLIST_MODAL = "IS_TOGGLE_PLAY_PLIST_MODAL";
export const UPDATE_IS_OPEN_PLAY_PLIST_MODAL =
  "UPDATE_IS_OPEN_PLAY_PLIST_MODAL";
export const IS_TOGGLE_RANDOM = "IS_TOGGLE_RANDOM";

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
  image: "/banner.png",
  src: "/anh-la-cua-em.mp3",
  views: 0,
  likes: 0,
  genre: "default",
};

export const DRAWER_LIST = [
  {
    icon: "home",
    href: "/",
    title: "Trang chủ",
    isAuth: false,
  },
  {
    icon: "genre",
    href: "/the-loai",
    title: "Thể loại",
    isAuth: false,
  },
  {
    icon: "music",
    href: "/bai-hat",
    title: "Bài hát",
    isAuth: false,
  },
  {
    icon: "list",
    href: "/thu-vien",
    title: "Thư viện",
    isAuth: true,
  },
];
export const DEFAULT_SONG_TIME = { currentTime: "00:00", allTime: "00:00" };

// Error message for Validate form
export const VALIDATION_EMAIL_REQUIRED = "Email không được để trống";
export const VALIDATION_EMAIL_INVALID = "Email không đúng định dạng";
export const VALIDATION_PASSWORD_REQUIRED = "Mật khẩu không được để trống";
export const VALIDATION_NAME_REQUIRED = "Tên tài khoản không được để trống";
export const VALIDATION_CONFIRM_PASSWORD_REQUIRED =
  "Mật khẩu xác nhận không được để trống";
export const VALIDATION_CONFIRM_PASSWORD_NOT_MATCH =
  "Mật khẩu không trùng khớp";
export const VALIDATION_CONFIRM_PASSWORD_STRONG =
  "Mật khẩu phải chứa các ký tự viết thường, viết hoa, ít nhất một chữ số, ít nhất một ký tự đặc biệt và có độ dài tối thiểu là 8";

//Regex ( Regular Expression)
export const REGEX_STRONG_PASSWORD =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/g;

// localStorage
export const PLAY_LIST_HISTORY = "PLAY_LIST_HISTORY";
export const ACCESS_TOKEN = "access_token";

//socket
export const SOCKET_LIKE_CREATED = "SOCKET_LIKE_CREATED";
export const SOCKET_LIKE_DELETED = "SOCKET_LIKE_DELETED";
export const SOCKET_MY_LIBRARY_ADD_THIS_SONG =
  "SOCKET_MY_LIBRARY_ADD_THIS_SONG";
export const SOCKET_MY_LIBRARY_REMOVE_THIS_SONG =
  "SOCKET_MY_LIBRARY_REMOVE_THIS_SONG";
