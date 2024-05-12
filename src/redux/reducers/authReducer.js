// authReducer.js

const initialState = {
  userInfo: {},
  loggedIn: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        userInfo: action.payload,
        loggedIn: true
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        userInfo: {},
        loggedIn: false
      };
    default:
      return state;
  }
};

export default authReducer;
