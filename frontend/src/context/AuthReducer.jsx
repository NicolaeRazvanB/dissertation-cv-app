const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        userInfo: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        userInfo: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        userInfo: null,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        userInfo: null,
        isFetching: false,
        error: false,
      };

    case "UPDATE_USER":
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          [action.payload.type]: action.payload.value,
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
