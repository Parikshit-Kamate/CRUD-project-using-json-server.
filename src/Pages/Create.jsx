import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        if (title.trim() && description.trim()) {
            try {
               
                await axios.post("http://localhost:8000/tasks", {
                    title,
                    description,
                    completed: false,
                });
                
                navigate('/home');
            } catch (error) {
                console.log("Error submitting task:", error);
            }
        } else {
            alert("All fields are compulsory");
        }
    };

    return (
        <div>
            <h2>Add Task</h2>
            <div className="w-25 bg-secondary mx-auto p-3 rounded-3">
                <div className="mb-3">

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
                <button onClick={handleSubmit} className="btn btn-success me-3 mt-3">Add Task</button>
                <button onClick={() => navigate('/home')} className="btn btn-danger me-3 mt-3">Cancel</button>
            </div>
        </div>
    );
};

export default Create;
