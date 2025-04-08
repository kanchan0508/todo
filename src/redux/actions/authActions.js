export const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user
});

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error
});

export const login = (username, password) => (dispatch) => {
  // For demo purposes, simply "authenticate" if username and password are non-empty.
  if (username && password) {
    dispatch(loginSuccess({ username }));
  } else {
    // In a real app, you might dispatch an error action
    dispatch(loginFailure('Invalid credentials'));
  }
};

export const logout = () => ({
  type: 'LOGOUT'
});
