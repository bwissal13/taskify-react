
// import React from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// function SignInForm() {
//   const [state, setState] = React.useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = evt => {
//     const { name, value } = evt.target;
//     setState(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };
//   const navigate = useNavigate();
//   const handleOnSubmit = async evt => {
//     evt.preventDefault();

//     const { email, password } = state;

//     try {
//       // Send POST request to login endpoint
//       const response = await axios.post("http://127.0.0.1:8000/api/login", {
//         email,
//         password
//       });

//       // Extract token from response
//       const authToken = response.data.token;

//       // Store token in local storage
//       localStorage.setItem("authToken", authToken);

//       // Handle success response
//       // alert(`Logged in successfully with email: ${email}`);
//       navigate('/AddTasks');
//       // Check if the token is registered
//       const authTokenr = localStorage.getItem("authToken");
//       if (authTokenr) {
//         console.log("Token registered:", authToken);
//       } else {
//         console.log("Token not registered");
//       }

//       // Clear input fields after successful login
//       setState({
//         email: "",
//         password: ""
//       });
//     } catch (error) {
//       // Handle error response
//       alert("Login failed. Please check your credentials.");
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <div className="form-container sign-in-container">
//       <form onSubmit={handleOnSubmit}>
//         <h1>Sign in</h1>
//         <div className="social-container"></div>
//         <input
//           type="email"
//           placeholder="Email"
//           name="email"
//           value={state.email}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={state.password}
//           onChange={handleChange}
//         />
//         <a href="#">Forgot your password?</a>
//         <button className="stylebutton">Sign In</button>
//       </form>
//     </div>
//   );
// }

// export default SignInForm;
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
