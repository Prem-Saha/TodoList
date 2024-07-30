import { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleExpand = () => setIsExpanded(!isExpanded);
  const handleUpdate = async () => {
    const updatedTask = { ...task, title, description };
    const response = await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    if (response.ok) {
      onUpdate(task.id, updatedTask);
      setIsExpanded(false);
    }
  };

  const handleDelete = async () => {
    const response = await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: task.id }),
    });
    if (response.ok) {
      onDelete(task.id);
    }
  };

  // Consistent date-time format
  const formattedDateTime = new Date(task.timestamp).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4 max-w-lg mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-500">{formattedDateTime}</p>
        </div>
        <div>
          <button onClick={handleExpand} className="btn-blue-secondary mr-2">Edit</button>
          <button onClick={handleDelete} className="btn-red-secondary">Delete</button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="title" className="text-lg font-semibold mb-2">Task Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-primary w-full"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="description" className="text-lg font-semibold mb-2">Task Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea-primary w-full"
            />
          </div>
          <button onClick={handleUpdate} className="btn-green-primary w-full">Save</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
