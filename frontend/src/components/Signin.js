import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Sign in
const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword]  = useState('');
  const [message, setMessage] = useState('');
  const navigate  = useNavigate();

  const Auth = async(e)  => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/login', {
        email: email, 
        password: password
      });
      navigate('/dashboard');
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
              <form onSubmit={Auth} className='box'>
                {/* Error Message */}
                <div class='is-size-6 is-uppercase has-text-centered has-text-weight-bold mt-2'>{message}</div>
                {/* Email or Username */}
                <div className='field mt-5'>
                  <label className='label'>Email</label>
                  <div className='control'>
                    <input type='text' className='input' placholder='Email' value={email} onChange={(e) => setEmail(e.target.value) } />
                  </div>
                </div>
                {/* Password */}
                <div className='field mt-4'>
                  <label className='label'> Password </label>
                  <div className='control'>
                    <input type='password' className='input' placholder='*******' value={password} onChange={(e) => setPassword(e.target.value) }/>
                  </div>
                </div>
                {/* Button */}
                <div className='field mt-6'>
                  <button className="button is-success is-fullwidth">Sign In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signin;