import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './IndexPage.css';
import { useContext, useState } from 'react';
import { UserContext } from '../UserContext.jsx';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function loginAuth(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post('/login', { email, password });
      setUser(data)
      setRedirect(true);
      alert('Login successful');
    } catch {
      alert('Login failed');
    }
  }
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={loginAuth}>
          <input
            type="email"
            placeholder="your@email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">login</button>
          <div className="text-center py-2 text-grey-500">
            Don't have an account yet?
            <Link to={'/register'} className=" px-2 underline text-black">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// why value attribute is in curly braces in input
