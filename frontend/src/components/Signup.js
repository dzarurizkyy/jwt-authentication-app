import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Sign up
const Signup = () => {
  const [name, setName]  = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword]  = useState('');
  const [confirmPassword, setConfirmPassword]  = useState('');
  const [message, setMessage] = useState('');
  const navigate  = useNavigate();

  const Signup = async(e)  => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', {
        name: name, 
        email: email, 
        password: password,
        confirmPassword: confirmPassword
      });
      navigate('/');
    }
    catch(error) {
      if(error.response) {
        setMessage(error.response.data.message);
      }
    }
  }
  return (
    <section className='hero has-background-grey-light is-fullheight is-full-width'>
      <div className='hero-body'>
        <div className='container'>
          <div className='columns is-centered'>
            <div className='column is-4-desktop'>
              <form onSubmit={Signup} className='box'>
                {/* Password and Confirmation Password Not Match */}
                <div class='is-size-6 is-uppercase has-text-centered has-text-weight-bold mt-2'>{message}</div> 
                {/* Name */}
                <div className='field mt-5'>
                  <label className='label'>Name</label>
                  <div className='control'>
                    <input type='text' className='input' placholder='Name' value={name} onChange={(e) => setName(e.target.value) } />
                  </div>
                </div>
                {/* Email */}
                <div className='field mt-4'>
                  <label className='label'>Email</label>
                  <div className='control'>
                    <input type='text' className='input' placholder='Email' value={email} onChange={(e) => setEmail(e.target.value) } />
                  </div>
                </div>
                {/* Password */}
                <div className='field mt-4'>
                  <label className='label'>Password</label>
                  <div className='control'>
                    <input type='password' className='input' placholder='*******' value={password} onChange={(e) => setPassword(e.target.value) } />
                  </div>
                </div>
                {/* Confirmation Password */}
                <div className='field mt-4'>
                  <label className='label'>Confirm Password</label>
                  <div className='control'>
                    <input type='password' className='input' placholder='*******' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value) } />
                  </div>
                </div>
                {/* Button */}
                <div className='field mt-6'>
                  <button className="button is-success is-fullwidth">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup;