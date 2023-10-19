import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenProvider , useToken } from "./TokenProvider";
import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const { token, setToken } = useToken(); // State to store the bearer token
  const [loginData, setLoginData] = useState({
    login_id: "",
    password: "",
  });

  // Function to update the state with user input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Function to authenticate the user and obtain the bearer token
  const authenticateUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData), // Use user input data
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token); // Store the bearer token in the state
        navigate('/customer-details');
      } else {
        alert("please enter valid credentials");
      }
    } catch (error) {
      alert(error);
    }
  };

  // Function to call the authentication function when needed
  const handleAuthentication = () => {
    if (!token) {
      authenticateUser();
    } else {
      console.log("User already authenticated");
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <h3>Email:</h3>
        <input
          type="text"
          name="login_id"
          value={loginData.login_id}
          onChange={handleChange}
        />
        <h3>Password:</h3>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
        <button onClick={handleAuthentication}>Login</button>
      </div>
      
      
    </div>
  );
};

export default Login;
