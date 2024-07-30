import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';

export async function getServerSideProps(context) {
  try {
    const res = await fetch('http://localhost:3000/data.json'); // Adjust URL if necessary
    if (!res.ok) throw new Error('Network response was not ok');
    const tasks = await res.json();
    const searchQuery = context.query.search || '';
    return {
      props: {
        tasks,
        searchQuery,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        tasks: [],
        searchQuery: '',
      },
    };
  }
}

export default function Home({ tasks, searchQuery }) {
  const [taskList, setTaskList] = useState(tasks);
  const [search, setSearch] = useState(searchQuery);

  useEffect(() => {
    if (search) {
      setTaskList(tasks.filter(task => 
        task.title.toLowerCase().includes(search.toLowerCase())
      ));
    } else {
      setTaskList(tasks);
    }
  }, [search, tasks]);
  

  const handleAddTask = (newTask) => {
    setTaskList([...taskList, newTask]);
  };

  const handleUpdateTask = (id, updatedTask) => {
    setTaskList(taskList.map(task => (task.id === id ? updatedTask : task)));
  };

  const handleDeleteTask = (id) => {
    setTaskList(taskList.filter(task => task.id !== id));
  };

  return (
    <Layout>
      <div className="text-center my-8">
        <h1 className="text-4xl font-bold text-gray-400">Todo List</h1>
      </div>
      <div className="py-3 rounded-lg my-8 max-w-xl mx-auto">
        <TaskForm onAddTask={handleAddTask} />
      </div>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </div>
      <div>
        {taskList.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
      <footer className="text-center mt-8 py-4 border-t border-gray-700">
        <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Prem Saha. All rights reserved.</p>
      </footer>
    </Layout>
  );
}
