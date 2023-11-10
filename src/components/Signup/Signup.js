import './signup.css'
import React, { Component } from 'react';
import axios from 'axios';
import Imglogo from './logo.png'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      user_password: '',
      user_name: ''
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // 사용자 정보를 서버로 보내는 POST 요청을 만듭니다.
    axios.post('http://localhost:3000/user/join', {
      user_id: this.state.user_id,
      user_password: this.state.user_password,
      user_name: this.state.user_name
    })

    .then(response => {
      // 성공적으로 서버로 전송된 경우의 처리
      console.log('회원가입 성공:', response.data);
    })
    .catch(error => {
      // 오류 처리
      console.error('회원가입 오류:', error);
    });
  }


  render() {
    return (
      <div className={"SignUp"}>
        <div className={"KhutionLogo"}>
          <img className={"logoimg"} alt="로고" src={Imglogo}/>
        </div>
        < div className={"Logo"}>Khution</div>
        <div className={"signupinfo"}>
        <form onSubmit={this.handleSubmit}>
          <div className={"userInfo"}>
            <label htmlFor="user_id">USER ID  :</label>
            <input className={"textbox"}
              type="text"
              id="user_id"
              name="user_id"
              value={this.state.user_id}
              onChange={this.handleInputChange}
            />
          </div>
          <div className={"userInfo"}>
            <label htmlFor="user_password">USER PW:</label>
            <input className={"textbox"}
              type="password"
              id="user_password"
              name="user_password"
              value={this.state.user_password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className={"userInfo"}>
            <label htmlFor="user_name">NAME     :</label>
            <input className={"textbox"}
              type="text"
              id="user_name"
              name="user_name"
              value={this.state.user_name}
              onChange={this.handleInputChange}
            />
          </div>
          <button className={"submitbtn"} type="submitbtn">Sign Up</button>
        </form>
        </div>
      </div>
    );
  }
}

export default Signup;