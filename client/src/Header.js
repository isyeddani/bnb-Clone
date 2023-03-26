import logo from './airbnb-logo.png';
import serachlogo from './Search-icon.png';
import bar3 from './bar-3.png'; 
import user from './userLogo.png'; 
import './App.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext.js';
import { useState } from 'react';

export default function Header(){

  const {user} = useContext(UserContext)
return (
    <div>
      <header className="flex gap-1 justify-between">
        <div className="flex">  
          <img src={logo} className="w-20"></img>
        </div>
        <div className="flex gap-2 border border-grey-300 rounded-full p-4 self-center shadow-md shadow-grey-300">
          <div>Anywhere</div>
          <div className="border-l border-grey-300"></div>
          <div>Anyweek</div>
          <div className="border-l border-grey-300"></div>
          <div>Add guests</div>
          <button className="bg-primary p-2 rounded-full">
            <img src={serachlogo} className="w-5"></img>
          </button>
        </div>
        <Link to={'/login'} className='flex gap-2 border border-grey-300 rounded-full p-4 self-center'>
        <img src={bar3} className="w-5"></img>
        <img src={user} className="w-6 rounded-full"></img>
        </Link>
      </header>
    </div>
);
}

