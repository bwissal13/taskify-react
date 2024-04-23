import React from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { useNavigate } from "react-router-dom";
function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };
  const navigate = useNavigate();
  const handleOnSubmit = async evt => {
    evt.preventDefault();

    const { name, email, password } = state;

    try {
      // Send POST request to register endpoint
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: password
      });

      // Handle success response
      alert("Sign up successful!sign in to add tasks!!");
     
      // Clear input fields after successful registration
      setState({
        name: "",
        email: "",
        password: ""
      });
    } catch (error) {
      // Handle error response
      alert("Sign up failed. Please try again.");
      console.error("Sign up error:", error);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div className="social-container"></div>
        {/* <span>or use your email for registration</span> */}
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button className="stylebutton">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
