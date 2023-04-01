import axios from 'axios';
import { useEffect, useState } from 'react';

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('places').then((response) => {
      setPlaces([...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,...response.data,]);
    });
  }, []);

  return (
    <div className='flex w-fit gap-x-6 gap-y-8 mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {places.length > 0 && places.map((places) => 
      <div>
        <div className='bg-gray-500 rounded-2xl flex mb-2'>
          {places.photos?.[0] && (
            <img className='rounded-2xl object-cover aspect-square' src={`http://localhost:4000/uploads/${places.photos?.[0]}`} />
          )}
        </div>
        <h3 className='font-bold'>{places.address}</h3>
        <h2 className='text-sm text-gray-500'>{places.title}</h2>
        <div className='mt-1'>
          <span className='font-bold'>${places.price}</span> per night
        </div>
        </div>)}
    </div>
  );
}
