import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AddTasks from './AddTasks';

const mockAxios = new MockAdapter(axios);
const mockTasks = [
  { id: 1, title: 'Task 1', description: 'Description 1', is_completed: false },
  { id: 2, title: 'Task 2', description: 'Description 2', is_completed: true },
];

test('renders AddTasks component', async () => {
  // Mock Axios GET request
  mockAxios.onGet('http://127.0.0.1:8000/api/v1/tasks').reply(200, { data: mockTasks });
  
  // Render AddTasks component
  const { getByText } = render(React.createElement(AddTasks, { authToken: "dummyAuthToken" }));

  // Wait for tasks to be fetched
  await waitFor(() => {
    // Assert that tasks are rendered
    expect(getByText('Task 1')).toBeInTheDocument();
    expect(getByText('Task 2')).toBeInTheDocument();
  });
});
