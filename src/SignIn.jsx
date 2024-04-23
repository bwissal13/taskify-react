
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password
      });

      const authToken = response.data.token;
      localStorage.setItem("authToken", authToken);

      // Fetch user ID after successful login
      const userResponse = await axios.get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      const userId = userResponse.data.id;
      // Store user ID in local storage
      localStorage.setItem("userId", userId);

      // Navigate to AddTasks page
      navigate('/AddTasks');
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <button className="stylebutton">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
