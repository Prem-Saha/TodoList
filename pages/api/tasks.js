// pages/api/tasks.js

import fs from 'fs';
import path from 'path';

// Utility function to get the path to the data.json file
const getDataFilePath = () => {
  return path.join(process.cwd(), 'public', 'data.json');
};

// Utility function to read the JSON data
const readData = () => {
  const filePath = getDataFilePath();
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
};

// Utility function to write the JSON data
const writeData = (data) => {
  const filePath = getDataFilePath();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// API route handler
export default (req, res) => {
  switch (req.method) {
    case 'GET':
      const data = readData();
      res.status(200).json(data);
      break;

    case 'POST':
      const newTask = req.body;
      const tasks = readData();
      newTask.id = Date.now(); // Simple ID generation
      tasks.push(newTask);
      writeData(tasks);
      res.status(201).json(newTask);
      break;

    case 'PUT':
      const updatedTask = req.body;
      let tasksData = readData();
      tasksData = tasksData.map((task) => (task.id === updatedTask.id ? updatedTask : task));
      writeData(tasksData);
      res.status(200).json(updatedTask);
      break;

    case 'DELETE':
      const { id } = req.body;
      let remainingTasks = readData();
      remainingTasks = remainingTasks.filter((task) => task.id !== id);
      writeData(remainingTasks);
      res.status(200).json({ message: 'Task deleted' });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
