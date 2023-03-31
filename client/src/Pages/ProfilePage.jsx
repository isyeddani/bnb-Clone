import PlacesPage from './PlacesPage';
import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import AccountNavigation from '../AccountNavigation';

export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
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

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'}></Navigate>;
  }

  if (redirect === '/') {
    return <Navigate to={redirect}></Navigate>;
  }

  return (
    <div>
      <AccountNavigation />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={Logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
}
