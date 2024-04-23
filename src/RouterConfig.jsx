import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Home from './Home';
import Task from './tasknew';
import AddTasks from './AddTasks';
import ProtectedRoute from './ProtectedRoute';

const routes = [
  {
    path: '/',
    element: <Home />,
    children: [
      { path: '/', element: <Home />, index: true },
      { path: '/AddTasks/*', element: <ProtectedRoute component={AddTasks} /> },
      { path: '/task', element: <ProtectedRoute component={Task} /> }
    ]
  }
];

const RouterConfig = createBrowserRouter(routes);

export default RouterConfig;
