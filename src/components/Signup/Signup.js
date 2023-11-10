import './signup.css'
import React, { useState } from 'react';
import Imglogo from './logo.png';

function Signup() {
  const [formData, setFormData] = useState({
    "user_id": " ",
    "user_password": " ",
    "user_name": " ",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formData);

    try {
      const response = await fetch("http://localhost:8080/user/join", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (response.ok) {
        const data =  response.json();
        console.log(data);
      } else {
        console.log(formData);
        console.error("회원가입 오류");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  return (
    <div className={"SignUp"}>
      <div className={"KhutionLogo"}>
        <img className={"logoimg"} alt="로고" src={Imglogo} />
      </div>
      <div className={"Logo"}>Khution</div>
      <div className={"signupinfo"}>
        <form onSubmit={handleSubmit}>
          <div className={"userInfo"}>
            <label htmlFor="user_id">USER ID :</label>
            <input
              className={"textbox"}
              type="text"
              id="user_id"
              name="user_id"
              value={formData.userId}
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
              value={formData.userPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className={"userInfo"}>
            <label htmlFor="user_name">NAME :</label>
            <input
              className={"textbox"}
              type="text"
              id="user_name"
              name="user_name"
              value={formData.userName}
              onChange={handleInputChange}
            />
          </div>
          <button className={"submitbtn"} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
