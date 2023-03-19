import { Link } from 'react-router-dom';
import './IndexPage.css';


export default function LoginPage() {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="your@email" />
          <input type="password" placeholder="password" />
          <button className="primary">login</button>
          <div className='text-center py-2 text-grey-500'>
            Don't have an account yet?
            <Link to={'/register'} className=' px-2 underline text-black'>
                Register Now
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}
