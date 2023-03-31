import { Link, useParams } from 'react-router-dom';
import AccountNavigation from '../AccountNavigation';
import Plus from '../Plus.png';

export default function PlacesPage() {
  return (
    <div>
      <AccountNavigation />
      {/* If new places not cliked then it will render bellow div*/}
      <div className="text-center">
        List of all places
        <br />
        <Link
          to={'/account/places/new'}
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
        >
          <img className="mt-0.5 w-7 h-5" src={Plus}></img>Add new places
        </Link>
      </div>
    </div>
  );
}
