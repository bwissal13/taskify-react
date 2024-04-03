
// import React from "react";
// import Home from "./Home";

// export default function App() {
//   return (
//     <div>
//       <Home />
//     </div>
//   );
// }
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes

// import Home from './Home';
// import AddTasks from './AddTasks';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route exact path="/" element={<Home />} /> {/* Use element prop instead of component */}
//           <Route path="/AddTasks" element={<AddTasks />} /> {/* Use element prop instead of component */}
//           {/* Add more routes as needed */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Task from './tasknew';
import AddTasks from './AddTasks';

function App() {
  // State to store the authentication token
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* Pass the authToken as a prop to the AddTasks component */}
          <Route
            path="/AddTasks"
            element={<AddTasks authToken={authToken} />}
          />
            <Route exact path="/task" element={<Task authToken={authToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

