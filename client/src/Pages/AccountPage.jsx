import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { useParams, Navigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function AccountPage() {
  const { ready, user,setUser } = useContext(UserContext);
  let [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }

  
  async function Logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }
  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user) {
    return <Navigate to={'/login'}></Navigate>;
  }

  if(redirect === '/'){
    return <Navigate to={redirect}></Navigate>;
  }

  function linkClasses(type = null) {
    let properties = 'p-2 px-6';
    if (type === subpage) {
      properties += ' bg-primary text-white rounded-full';
    }
    return properties;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-4 mb-8">
        <Link className={linkClasses('profile')} to={'/account'}>
          My Profile
        </Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>
          My Bookings
        </Link>
        <Link className={linkClasses('places')} to={'/account/places'}>
          My Accommodation
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={Logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
