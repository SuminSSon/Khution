import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Imglogo from './logo.png';

function Login() {
  const [user_id, setUser_id] = useState('');
  const [user_password, setUser_password] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'user_id') {
      setUser_id(value);
    } else if (name === 'user_password') {
      setUser_password(value);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 사용자 정보를 서버로 보내는 POST 요청을 만듭니다.
      const response = await axios.get('http://localhost:8080/user/login', {
        params: {
          user_id: user_id,
          user_password: user_password,
        }
      });

      // 성공 시 navigate를 사용하여 페이지 이동
      console.log('로그인 성공:', response.data);
      localStorage.setItem('user_id', user_id);
      navigate('/Main');
    } catch (error) {
      // 오류 처리
      console.error('로그인 오류:', error);
    }
  }

  return (
    <div className={"SignUp"}>
      <div className={"KhutionLogo"}>
        <img className={"logoimg"} alt="로고" src={Imglogo} />
      </div>
      <div className={"Logo"}>Khution</div>
      <div className={"signupinfo"}>
        <form onSubmit={handleSubmit}>
          <div className={"userInfo"}>
            <label htmlFor="user_id">USER ID:</label>
            <input
              className={"textbox"}
              type="text"
              id="user_id"
              name="user_id"
              value={user_id}
              onChange={handleInputChange}
            />
          </div>
          <div className={"userInfo"}>
            <label htmlFor="user_password">USER PW:</label>
            <input
              className={"textbox"}
              type="password"
              id="user_password"
              name="user_password"
              value={user_password}
              onChange={handleInputChange}
            />
          </div>
          <button className={"submitbtn"} type="submitbtn">
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
