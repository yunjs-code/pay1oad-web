const initialState = {
  userInfo: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
