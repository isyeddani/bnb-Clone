import { Link, useParams } from 'react-router-dom';
import AccountNavigation from '../AccountNavigation';
import Plus from '../Plus.png';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  
  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNavigation />
      {/* If new places not cliked then it will render bellow div*/}
      <div className="text-center">
        <Link
          to={'/account/places/new'}
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
        >
          <img className="mt-0.5 w-7 h-5" src={Plus}></img>Add new places
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((places) => (
            <Link to={`/account/places/${places._id}`}>
              <div className="flex bg-gray-100 p-4 rounded-2xl gap-4 mb-4">
                <div className="bg-gray-500 h-fit rounded-2xl">
                  {places.photos.length > 0 && (
                    <img
                      className="w-32 h-32 object-cover rounded-2xl"
                      src={'http://localhost:4000/uploads/' + places.photos[0]}
                      alt="Photo Not Found"
                    />
                  )}
                </div>
                <div className="px-4 w-fit">
                  <h2 className="text-xl">{places.title}</h2>
                  <p className="text-sm mt-2">{places.description}</p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
