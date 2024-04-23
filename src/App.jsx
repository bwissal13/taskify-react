
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Home';
// import Task from './tasknew';
// import AddTasks from './AddTasks';
// import ProtectedRoute from './ProtectedRoute';

// function App() {
//   // Get the authentication token from local storage
//   const authToken = localStorage.getItem('authToken');

//   // Check if authToken exists
//   const isAuthenticated = !!authToken;

//   return (
//     <Router>
//       <div>
//         <Routes>
//           {/* Home route */}
//           <Route exact path="/" element={<Home />} />
          
//           {/* Protected routes */}
//           <Route
//             path="/AddTasks/*"
//             element={<ProtectedRoute component={AddTasks} isAuthenticated={isAuthenticated} />}
//           />
//           <Route
//             path="/task"
//             element={<ProtectedRoute component={Task} isAuthenticated={isAuthenticated} />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { RouterProvider } from 'react-router-dom'
import RouterConfig from './RouterConfig'; 
import { AuthProvider } from './AuthProvider';
function App() {
  return (
    
      <AuthProvider>
     <RouterProvider router={RouterConfig} />
    </AuthProvider>
 
  );
}

export default App;
