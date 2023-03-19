import './IndexPage.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [name,setName]  = useState('');
  const [location,setLocation]  = useState('');
  const [email,setEmail]  = useState('');
  const [password,setPassword]  = useState('');
  function registerUser(ev){
      ev.preventDefault();
      axios.post('/register');
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="text" placeholder="Full Name" value={name} onChange={ev=> setName(ev.target.value)}  />
          <input type="text" placeholder="Location" value={location} onChange={ev=> setLocation(ev.target.value)}/>
          <input type="email" placeholder="your@email" value={email} onChange={ev=> setEmail(ev.target.value)}/>
          <input type="password" placeholder="password" value={password} onChange={ev=> setPassword(ev.target.value)}/>
          <button className="primary">Register</button>
          <div className="text-center py-2 text-grey-500">
            Already a member?
            <Link to={'/login'} className=" px-2 underline text-black">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
