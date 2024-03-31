export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (userInfo) => ({
  type: "LOGIN_SUCCESS",
  payload: userInfo,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const Logout = () => ({
  type: "LOGOUT",
});

export const UpdateUser = (newInfo) => ({
  type: "UPDATE_USER",
  payload: newInfo,
});
