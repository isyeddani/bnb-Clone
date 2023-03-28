import logo from './airbnb-logo.png';
import serachlogo from './Search-icon.png';
import bar3 from './bar-3.png';
import userimg from './userLogo.png';
import './App.css';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user } = useContext(UserContext);
  console.log("user:",{user})
  return (
    <div>
      <header className="flex gap-1 justify-between">
        <Link to={'/'} className="flex">
          <img src={logo} className="w-20"></img>
        </Link>
        <div className="items-center h-12 px-3 flex flex-row border border-grey-300 rounded-full shadow-md shadow-grey-300">
          <div className="grid p-2">Anywhere</div>
          <div className="rounded-full bg-gray-200 h-8 p-0.5"></div>
          <div className="grid p-2">Anyweek</div>
          <div className="rounded-full bg-gray-200 h-8 p-0.5"></div>
          <div className="grid p-2">Add guests</div>
          <button className="items-center bg-primary rounded-full w-7 h-7">
            <img src={serachlogo} className="mx-auto"></img>
          </button>
        </div>
        <Link
          to={user ? '/account' : '/login'}
          className="flex h-12 gap-2 border border-grey-500 rounded-full p-3 self-center"
        >
          <img src={bar3} className="mx-auto "></img>
          <img src={userimg} className="mx-auto"></img>
          {!!user && <div>{user.name}</div>}
        </Link>
      </header>
    </div>
  );
}
