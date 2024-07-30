export async function fetchTasks() {
    try {
        const response = await fetch('/api/tasks');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        throw error;
    }
}
