import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function SignInForm() {
  const [state, setState] = React.useState({
    username: "",
    password: ""
  });
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async evt => {
    evt.preventDefault();
    const { username, password } = state;

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1/login/", {
        username: username,
        password
      });
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      setError(""); 
      navigate("/events");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={state.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          required
        />
        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default SignInForm;
