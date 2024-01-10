import React, { useState } from 'react';

function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(JSON.stringify({ username, password }));
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                setMessage(data.msg); // Handle successful login
            } else {
                setMessage(data.msg); // Handle errors, show messages
            }
        } catch (error) {
            setMessage('an error occured');
            console.error('Error:', error);
        }
      };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registration</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
}

export default Registration;
