import { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, completed: false, timestamp: new Date().toISOString() };
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    const addedTask = await response.json();
    onAddTask(addedTask);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Task</h2>
      <div className="flex flex-col mb-4">
        <label htmlFor="title" className="text-lg font-semibold mb-2 text-gray-900">Task Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-primary w-full"
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="description" className="text-lg font-semibold mb-2 text-gray-900">Task Description</label>
        <textarea
          id="description"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea-primary w-full"
        />
      </div>
      <button type="submit" className="btn-green-primary w-full">Add Task</button>
    </form>
  );
};

export default TaskForm;
