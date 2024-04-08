import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useHistory 대신 useNavigate 사용

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // navigate 함수 생성

  const handleLogin = (event) => {
    event.preventDefault();
    if (email && password) {
      console.log('로그인 성공:', email, password);
      navigate('/');  // 로그인 성공 후 메인 페이지로 이동
    } else {
      console.log('이메일과 비밀번호를 입력하세요.');
    }
  };

  return (
    <div className="login-page">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LoginPage;
