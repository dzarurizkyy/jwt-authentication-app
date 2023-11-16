import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Signin */}
        <Route exact path='/' element={<Signin/>} />
        {/* Signup */}
        <Route path='/register' element={<Signup/>} />
        {/* Dashboard */}
        <Route path='/dashboard' element={
          <div>
            <Navbar/> 
            <Dashboard/>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
