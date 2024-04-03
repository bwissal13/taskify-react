

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styled from "styled-components";
// import { AiFillDelete, AiFillEdit, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";

// const Container = styled.div`
//   width: 1000px;
//   background-color: white;
//   margin: 0 auto;
//   padding: 20px;
//   border: 1px solid #ccc;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const Input = styled.input`
//   margin-bottom: 10px;
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

// const Button = styled.button`
//   padding: 8px;
//   margin: 5px;
//   background-color: #413291;
//   border: none;
//   cursor: pointer;
// `;

// const TodoList = styled.div`
//   margin-top: 20px;
// `;

// const Task = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 10px;
//   background-color: #f9f9f9;
//   border-radius: 4px;
//   margin-bottom: 10px;
// `;

// const TaskActions = styled.div`
//   margin-left: auto;
// `;

// const TaskTitle = styled.div`
//   font-weight: bold;
// `;

// const TaskDescription = styled.div`
//   word-wrap: break-word;
// `;

// function AddTasks({ authToken }) {
//   const [tasks, setTasks] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [inputDescription, setInputDescription] = useState("");
//   const [editingTask, setEditingTask] = useState(null);
//   const [editedTitle, setEditedTitle] = useState("");
//   const [editedDescription, setEditedDescription] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/v1/tasks", {
//         headers: {
//           Authorization: `Bearer ${authToken}`
//         }
//       });
//       setTasks(response.data.data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setInputDescription(e.target.value);
//   };

//   const handleAddTask = async () => {
//     if (inputValue.trim() !== "") {
//       try {
//         await axios.post(
//           "http://127.0.0.1:8000/api/v1/tasks",
//           {
//             title: inputValue.trim(),
//             description: inputDescription.trim(),
//             is_completed: false
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${authToken}`
//             }
//           }
//         );
//         setInputValue("");
//         setInputDescription("");
//         fetchTasks();
//       } catch (error) {
//         console.error("Error adding task:", error);
//       }
//     }
//   };

//   const handleRemoveTask = async (taskId) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/v1/tasks/${taskId}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`
//         }
//       });
//       fetchTasks();
//     } catch (error) {
//       console.error("Error removing task:", error);
//     }
//   };

//   const handleCheckboxChange = async (e, taskId) => {
//     const isChecked = e.target.checked;
//     const newStatus = isChecked ? 1 : 0;
//     try {
//       await axios.put(
//         `http://127.0.0.1:8000/api/v1/tasks/${taskId}/status`,
//         { status: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`
//           }
//         }
//       );
//       fetchTasks();
//     } catch (error) {
//       console.error("Error toggling completion:", error);
//     }
//   };

//   const handleToggleCompletion = async (taskId, isCompleted) => {
//     const newStatus = isCompleted ? 0 : 1;
//     try {
//       await axios.put(
//         `http://127.0.0.1:8000/api/v1/tasks/${taskId}/status`,
//         { status: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`
//           }
//         }
//       );
//       fetchTasks();
//     } catch (error) {
//       console.error("Error toggling completion:", error);
//     }
//   };

//   const handleEdit = (task) => {
//     setEditingTask(task);
//     setEditedTitle(task.title);
//     setEditedDescription(task.description);
//   };

//   const handleSaveEdit = async () => {
//     try {
//       await axios.put(
//         `http://127.0.0.1:8000/api/v1/tasks/${editingTask.id}`,
//         {
//           title: editedTitle,
//           description: editedDescription
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`
//           }
//         }
//       );
//       fetchTasks();
//       setEditingTask(null);
//     } catch (error) {
//       console.error("Error editing task:", error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingTask(null);
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.delete("http://127.0.0.1:8000/api/logout", {
//         headers: {
//           Authorization: `Bearer ${authToken}`
//         }
//       });
//       navigate('/');  // Redirect to login page after logout
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <>
//       <Button onClick={handleLogout}>Logout</Button> {/* Logout button outside the container */}
//       <Container>
//         <h2>Add Tasks</h2>
//         <Form onSubmit={(e) => e.preventDefault()}>
//           <Input
//             type="text"
//             value={inputValue}
//             onChange={handleInputChange}
//             placeholder="Enter task..."
//           />
//           <Input
//             value={inputDescription}
//             onChange={handleDescriptionChange}
//             placeholder="Enter task description..."
//           />
//           <Button onClick={handleAddTask}>Add Task</Button>
//         </Form>

//         <TodoList>
//           {tasks.map((task) => (
//             <Task key={task.id}>
//               <div>
//                 {editingTask === task ? (
//                   <>
//                     <Input
//                       type="text"
//                       value={editedTitle}
//                       onChange={(e) => setEditedTitle(e.target.value)}
//                     />
//                     <Input
//                       type="text"
//                       value={editedDescription}
//                       onChange={(e) => setEditedDescription(e.target.value)}
//                     />
//                   </>
//                 ) : (
//                   <>
//                     <TaskTitle>{task.title}</TaskTitle>
//                     {task.description && (
//                       <TaskDescription>{task.description}</TaskDescription>
//                     )}
//                   </>
//                 )}
//               </div>
//               <TaskActions>
//                 {editingTask === task ? (
//                   <>
//                     <Button onClick={handleSaveEdit}><AiOutlineCheck /></Button>
//                     <Button onClick={handleCancelEdit}><AiOutlineClose /></Button>
//                   </>
//                 ) : (
//                   <>
//                     <AiFillEdit onClick={() => handleEdit(task)} />
//                     <AiFillDelete onClick={() => handleRemoveTask(task.id)} />
//                     <input
//                       type="checkbox"
//                       checked={task.is_completed}
//                       onChange={(e) => handleCheckboxChange(e, task.id)}
//                     />
//                   </>
//                 )}
//               </TaskActions>
//             </Task>
//           ))}
//         </TodoList>
//       </Container>
//     </>
//   );
// }

// export default AddTasks;

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { AiFillDelete, AiFillEdit, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 1000px;
  background-color: white;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px;
  margin: 5px;
  background-color: #413291;
  border: none;
  cursor: pointer;
`;

const TodoList = styled.div`
  margin-top: 20px;
`;

const Task = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const TaskActions = styled.div`
  margin-left: auto;
`;

const TaskTitle = styled.div`
  font-weight: bold;
`;

const TaskDescription = styled.div`
  word-wrap: break-word;
`;

function AddTasks({ authToken }) {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/v1/tasks", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      // Filter tasks based on user ID
      const userId = localStorage.getItem("userId");
      const filteredTasks = response.data.data.filter(task => task.user_id === parseInt(userId));
      setTasks(filteredTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

   const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setInputDescription(e.target.value);
  };

  const handleAddTask = async () => {
    if (inputValue.trim() !== "") {
      try {
        await axios.post(
          "http://127.0.0.1:8000/api/v1/tasks",
          {
            title: inputValue.trim(),
            description: inputDescription.trim(),
            is_completed: false
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );
        setInputValue("");
        setInputDescription("");
        fetchTasks();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const handleRemoveTask = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      fetchTasks();
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  const handleCheckboxChange = async (e, taskId) => {
    const isChecked = e.target.checked;
    const newStatus = isChecked ? 1 : 0;
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/v1/tasks/${taskId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  const handleToggleCompletion = async (taskId, isCompleted) => {
    const newStatus = isCompleted ? 0 : 1;
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/v1/tasks/${taskId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/v1/tasks/${editingTask.id}`,
        {
          title: editedTitle,
          description: editedDescription
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      fetchTasks();
      setEditingTask(null);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleLogout = async () => {
    try {
      await axios.delete("http://127.0.0.1:8000/api/logout", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      navigate('/');  // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <Button onClick={handleLogout}>Logout</Button> {/* Logout button outside the container */}
      <Container>
        <h2>Add Tasks</h2>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter task..."
          />
          <Input
            value={inputDescription}
            onChange={handleDescriptionChange}
            placeholder="Enter task description..."
          />
          <Button onClick={handleAddTask}>Add Task</Button>
        </Form>

        <TodoList>
          {tasks.map((task) => (
            <Task key={task.id}>
              <div>
                {editingTask === task ? (
                  <>
                    <Input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <Input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <TaskTitle>{task.title}</TaskTitle>
                    {task.description && (
                      <TaskDescription>{task.description}</TaskDescription>
                    )}
                  </>
                )}
              </div>
              <TaskActions>
                {editingTask === task ? (
                  <>
                    <Button onClick={handleSaveEdit}><AiOutlineCheck /></Button>
                    <Button onClick={handleCancelEdit}><AiOutlineClose /></Button>
                  </>
                ) : (
                  <>
                    <AiFillEdit onClick={() => handleEdit(task)} />
                    <AiFillDelete onClick={() => handleRemoveTask(task.id)} />
                    <input
                      type="checkbox"
                      checked={task.is_completed}
                      onChange={(e) => handleCheckboxChange(e, task.id)}
                    />
                  </>
                )}
              </TaskActions>
            </Task>
          ))}
        </TodoList>
      </Container>
    </>
  );
}

export default AddTasks;
