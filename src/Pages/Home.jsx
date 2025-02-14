import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, []);

    
    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:8000/tasks");
            setTasks(response.data);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

   
    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.log("Error deleting task:", error);
        }
    };

    
    const handleEdit = (task) => {
        navigate('/update', { state: { task } });
    };

    
    const toggleCompleted = async (task) => {
        try {
            const updatedTask = { ...task, completed: !task.completed };
            await axios.put(`http://localhost:8000/tasks/${task.id}`, updatedTask);
            fetchTasks();
        } catch (error) {
            console.log("Error toggling completed status:", error);
        }
    };

    return (
        <div>
            <h2>Tasks List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sr</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={task.id}>
                            <td style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                {index + 1}
                            </td>
                            <td style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                {task.title}
                            </td>
                            <td style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                {task.description}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(task)} className="btn btn-warning ms-3">Edit</button>
                                <button onClick={() => deleteTask(task.id)} className="btn btn-danger ms-3">Delete</button>
                                <button
                                    className="btn btn-primary ms-3"
                                    onClick={() => toggleCompleted(task)}
                                >
                                    {task.completed ? 'Undo' : 'Completed'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
