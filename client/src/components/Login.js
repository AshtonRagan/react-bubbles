import React, { useState } from "react";
import Axios from "axios";

const Login = props => {
  const [user, setUser] = useState({ username: "", password: "" });
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleSubmit = e => {
    e.preventDefault();

    Axios.post("http://localhost:5000/api/login", user)
      .then(res => {
        localStorage.setItem("Token", res.data.payload);
        props.history.push("/Protected");
      })
      .catch(err => console.log(err));
  };
  const handleChange = e => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter User name"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter User Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
