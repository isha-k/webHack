import React, { useEffect, useState } from 'react';
import TaskModal from '../components/TaskModal';
import axios from 'axios';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('accessToken'); // Get token for authentication
  const [levelPoints, setLevelPoints] = useState({}); // To store level and points
  const [suggestions, setSuggestions] = useState(''); // To store GPT suggestions
  const [leaderboard, setLeaderboard] = useState([]); // To store leaderboard data

  // Fetch tasks from the backend when the component is mounted
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/task/list/', {
          headers: {
            Authorization: `Bearer ${token}`, // Authentication header
          },
        });

        if (response.status === 200) {
          const fetchedTasks = response.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at) // Order by latest
          );
          setTasks(fetchedTasks);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const fetchLevelPoints = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/task/get_level_points/',
          {
            headers: {
              Authorization: `Bearer ${token}`, // Authentication header
            },
          }
        );

        if (response.status === 200) {
          setLevelPoints(response.data); // Set total points and level
        }
      } catch (error) {
        console.error('Error fetching level points:', error);
      }
    };

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/task/get_suggestion/',
          {
            headers: {
              Authorization: `Bearer ${token}`, // Authorization header
            },
          }
        );

        if (response.status === 200) {
          setSuggestions(response.data); // Set GPT suggestions
        }
      } catch (error) {
        console.error('Error fetching GPT suggestions:', error);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/task/leadership-board/'
        );

        if (response.status === 200) {
          setLeaderboard(response.data); // Set leaderboard data
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchTasks(); // Fetch tasks
    fetchLevelPoints(); // Fetch total points and level
    fetchSuggestions(); // Fetch GPT suggestions
    fetchLeaderboard(); // Fetch leaderboard
  }, [token]); // Dependencies for useEffect

  // Add a new task to the list
  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask }]); // Add to state
  };

  // Update a task's status with a POST request
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/task/update/${taskId}/`,
        { status: newStatus }, // New status to be set
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setTasks(
          tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task // Update status in state
          )
        );
      } else {
        console.error('Failed to update task status. Status:', response.status);
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Delete a task by ID with a DELETE request
  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/task/delete/${taskId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setTasks(tasks.filter((task) => task.id !== taskId)); // Remove from state
      } else {
        console.error('Failed to delete task. Status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 p-10 space-y-10">
      <br />
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">Kanban Board</h1>
            <div className="flex space-x-4">
              <div className="bg-blue-200 p-4 rounded">
                <h2 className="text-xl">Total Points</h2>
                <p className="text-2xl">{levelPoints.total_points ?? 0}</p>
              </div>
              <div className="bg-green-200 p-4 rounded">
                <h2 className="text-xl">Level</h2>
                <p className="text-2xl">{levelPoints.level ?? 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold">GPT Suggestion</h2>
            <p className="mt-4 text-gray-700">{suggestions}</p>
          </div>


          <div className="flex justify-around">
            {['todo', 'ongoing', 'completed'].map((status) => (
              <div key={status} className="flex flex-col items-center w-1/3 mr-4">
                <h2 className="text-2xl font-semibold">{status.toUpperCase()}</h2>
                <div className="bg-white rounded-lg shadow-md w-full p-6 space-y-4">
                  {tasks.filter((task) => task.status === status).length === 0 ? (
                    <p className="text-center text-gray-500">No tasks in {status}.</p>
                  ) : (
                    tasks
                      .filter((task) => task.status === status)
                      .map((task) => (
                        <div key={task.id} className="border-b pb-4">
                          <h3 className="text-lg font-bold">{task.title}</h3>
                          <p className="text-gray-600">{task.description}</p>
                          <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
                          <div className="flex justify-between mt-4">
                            {status !== 'todo' && (
                              <button
                                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                                onClick={() => updateTaskStatus(task.id, 'todo')}
                              >
                                To Do
                              </button>
                            )}
                            {status !== 'ongoing' && (
                              <button
                                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                onClick={() => updateTaskStatus(task.id, 'ongoing')}
                              >
                                Ongoing
                              </button>
                            )}
                            {status !== 'completed' && (
                              <button
                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                onClick={() => updateTaskStatus(task.id, 'completed')}
                              >
                                Completed
                              </button>
                            )}
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                              onClick={() => deleteTask(task.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                  )}
                </div>
                {status === 'todo' && (
                  <button
                    className="mt-6 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                    onClick={() => setIsModalOpen(true)} // Open modal to add a task
                  >
                    Add Task
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md w-full p-6 mr-2">
            <h2 className="text-2xl font-semibold mb-4">Leadership Board</h2>
            <ul className="space-y-4">
              {leaderboard.map((entry, index) => (
                <li key={index} className="flex justify-between p-2 border-b">
                  <span className="text-lg">{entry.user}</span>
                  <span className="text-lg">{entry.points}</span>
                </li>
              ))}
            </ul>
          </div>
          <TaskModal
            isOpen={isModalOpen} // Control modal visibility
            onClose={() => setIsModalOpen(false)} // Close modal
            onSubmit={addTask} // Submit new task
          />
        </div>
      );
    };

    export default KanbanBoard;
