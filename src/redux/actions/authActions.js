// authActions.js

// 로그인 액션 생성자
export const loginUser = (userInfo) => {
  return {
    type: 'LOGIN_USER',
    payload: userInfo
  };
};

// 로그아웃 액션 생성자
export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  };
};
