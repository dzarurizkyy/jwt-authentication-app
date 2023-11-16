import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {
  const navigate = useNavigate();
  // Logout Event
  const LogOut = async() => {
    try {
      await axios.delete('http://localhost:5000/logout');
      navigate('/');
    }
    catch(error) {
      console.log(error);
    }
  }
  
  return (
    <nav className='navbar is-warning p-2' role='navigation' aria-label='main navigation'>
      <div className='container'>
        <div className='navbar-brand'>
          {/* Navbar Logo */}
          <a className='navbar-item' href='https://bulma.io'>
            <img src='https://bulma.io/images/bulma-logo.png' width='112' height='28' alt='logo' />
          </a>

          {/* Navbar List */}
          <a href='/dashboard' role='button' className='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarBasicExample'>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a>  
        </div>

        {/* Home Button */}
        <div id='navbarBasicExample' className='navbar-menu'>
          <div className='navbar-start'>
            <a href='/dashboard' className='navbar-item'>
              Home
            </a>
          </div>

        {/* Logout Button */}
        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <button onClick={LogOut} className='button is-danger is-rounded'>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  );
}

export default Navbar;