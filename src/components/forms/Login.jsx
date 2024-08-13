import React, { useState } from 'react';
import { API_URL } from '../../data/ApiPath';

const Login = ({showWelcomeHandler}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login success");
        showWelcomeHandler();
        setEmail("");
        setPassword("");
        localStorage.setItem('loginToken', data.token);
      } 
      const vendorId=data.vendorId
      const vendorResponse=await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData=await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorFirmId=vendorData.vendorFirmId;
        localStorage.setItem('firmId',vendorFirmId);
        const vendorFirmName = vendorData.vendorFirmName;
        localStorage.setItem('firmName',vendorFirmName);
        console.log("jesus",vendorFirmName)
        window.location.reload();
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="loginSection">
      <form className='authForm' onSubmit={loginHandler}>
        <h3>Vendor Login</h3><br />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
