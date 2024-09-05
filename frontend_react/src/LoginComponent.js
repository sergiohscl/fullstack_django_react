import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserLists from './UserLists';

function LoginComponent() {
  const [username, setUsername] = useState('sergio');
  const [password, setPassword] = useState('123456');
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://127.0.0.1:8000/api-token-auth/';
    try {
      const response = await axios.post(url, { username, password });
      if (response.data.token) {
        setToken(response.data.token);
      } else {
        console.error('Invalid login');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logout = () => {
    setToken(null);
  };

  if (!token) {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={username} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handleChangePassword} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  } else {
    return (
      <div>
        <UserLists token={token} />
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
}

export default LoginComponent;