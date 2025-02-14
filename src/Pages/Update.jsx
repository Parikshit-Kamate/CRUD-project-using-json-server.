import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Update = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { task } = location.state || {};

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        } else {
           
            navigate('/home');
        }
    }, [task, navigate]);

    const handleUpdate = async () => {
        if (title.trim() && description.trim()) {
            try {
                await axios.put(`http://localhost:8000/tasks/${task.id}`, {
                    title,
                    description,
                    completed: task.completed, 
                });
                
                navigate('/home');
            } catch (error) {
                console.log("Error updating task:", error);
            }
        } else {
            alert("All fields are compulsory");
        }
    };

    return (
        <div>
            <h2>Update Task</h2>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button onClick={handleUpdate}>Update Task</button>
            <button onClick={() => navigate('/home')}>Cancel</button>   
        </div>     
    );
};

export default Update;
