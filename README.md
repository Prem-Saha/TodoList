# Todo List Application

## Overview

The Todo List Application is a modern web application built using Next.js, TailwindCSS, and React. It allows users to manage tasks by adding, updating, deleting, and searching tasks. The application features a clean, responsive design with a dark gradient background and intuitive UI components.

## System Design

### Features

- **Task Management**: Users can create new tasks, update existing tasks, and delete tasks.
- **Search Functionality**: Users can search for tasks by title, with case-insensitive search.
- **Expandable Task Items**: Tasks can be expanded to show additional details such as descriptions and allow editing.
- **Responsive Design**: The application is fully responsive, ensuring a good user experience across various screen sizes.
- **Dark Gradient Background**: The application has a modern dark gradient background for a professional look.

### Components

- **Layout**: A wrapper component that includes the navigation and footer, providing consistent styling across pages.
- **TaskForm**: A form component for adding new tasks and editing existing ones.
- **TaskItem**: A component that displays individual tasks, including title, description, and timestamp. It supports expanding to edit details.
- **Home**: The main page that displays the list of tasks, includes the search bar, and integrates the `TaskForm` and `TaskItem` components.

## Implementation

### Frontend

- **Next.js**: Used for server-side rendering (SSR) and routing.
- **React**: Provides the component-based architecture.
- **TailwindCSS**: Used for styling the components with a modern, responsive design.

### API Endpoints

- **GET `/api/tasks`**: Retrieves the list of tasks.
- **PUT `/api/tasks`**: Updates a task.
- **DELETE `/api/tasks`**: Deletes a task.

### Data

The application uses a dummy JSON file located at `public/data.json` for initial data. It can be replaced or expanded as needed.

### Server-Side Rendering

- **SSR**: Implemented in `index.js` using Next.js to fetch tasks from the server and render the page with the initial data.

## Setup and Running the Application

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/todo-list-app.git
   cd todo-list-app

2. **Install Dependencies**

   npm install

### Running the Application

1. **Start the Development Server**

   npm run dev

2. **Access the Application**

   Open your browser and go to http://localhost:3000 to view the application.