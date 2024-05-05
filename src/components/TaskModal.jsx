import React, { useState } from 'react';
import axios from 'axios';

const TaskModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');

  const token = localStorage.getItem('accessToken');

  const handleSubmit = async () => {
    if (title && description && deadlineDate && deadlineTime) {
      try {
        const newTask = {
          title,
          description,
          deadline: `${deadlineDate}T${deadlineTime}`,
        };

        const response = await axios.post(
          'http://127.0.0.1:8000/api/task/add/',
          newTask,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 201) {
          setTitle(''); // Reset the form
          setDescription('');
          setDeadlineDate('');
          setDeadlineTime('');

          onClose(); // Close the modal

          window.location.reload(); // Refresh the page after successful task addition
        } else {
          console.error('Failed to add task. Status:', response.status);
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  if (!isOpen) {
    return null; // If the modal is not open, don't render anything
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-2xl font-semibold">Add New Task</h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Task Title"
            className="border w-full p-2 mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Task Description"
            className="border w-full p-2 mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            className="border w-full p-2 mb-4"
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
          />
          <input
            type="time"
            className="border w-full p-2 mb-4"
            value={deadlineTime}
            onChange={(e) => setDeadlineTime(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSubmit} // Submit to add the task
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;