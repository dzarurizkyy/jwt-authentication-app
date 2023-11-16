import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useState([]);

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  // Generate Access Token
  const refreshToken = async() => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    }
    catch(error) {
      if(error.response) {
        navigate('/login');
      }
    }
  }

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async(config) => {
    const currentDate = new Date();
    if(expire * 1000 < currentDate.getTime()) {
      const response = await axios.get('http://localhost:5000/token');
      config.headers.Authorization = `Barrer ${response.data.accessToken}`;
  
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    }      
    return config;
  },(error) => {
    return Promise.reject(error);
  });

  // View All Users 
  const getUsers = async() => {
    try {
      const response = await axiosJWT.get('http://localhost:5000/users', {
      headers: {
        Authorization: `Barrer ${token}`
      }
    });
      setUsers(response.data);
    }
    catch(error) {
      console.log(error);
    }
  }

  return (
    <div className='container mt-5 pt-2'>
      <h1>Welcome, <span className='has-text-weight-medium'>{name}</span> 👋</h1>
      <button onClick={getUsers} className='button is-info is-light has-text-weight-semibold mt-5 mb-6'>Get Users</button>
      
      {/* Users Table */}
      
      <table className='table is-striped is-hoverable is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard;