import PhotosUploader from '../PhotosUploader';
import Perks from '../Perks';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Plus from '../Plus.png';

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuest, setMaxGuest] = useState(1);

  function InputHeader(text) {
    return <h2 className="text-xl mt-4">{text}</h2>;
  }
  function InputDescription(text) {
    return <p className="text-grey-500 text-sm">{text} </p>;
  }
  function preInput(Header, Description) {
    return (
      <>
        {InputHeader(Header)}
        {InputDescription(Description)}
      </>
    );
  }

  return (
    <div>
      {action !== 'new' && (
        <div className="text-center">
          <Link
            to={'/account/places/new'}
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          >
            <img className="mt-0.5 w-7 h-5" src={Plus}></img>Add new places
          </Link>
        </div>
      )}
      {action === 'new' && (
        <form>
          {preInput(
            'Titles',
            'title for your place. should be short and catchy as in adverstisment'
          )}
          <input
            type="text"
            placeholder="title, for example: My Lovely Appratment"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          ></input>
          {preInput('Address', 'Address to this place')}
          <input
            type="text"
            placeholder="address"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          ></input>
          {preInput('Photos', 'More = Better')}
          {/* First AddedPhotos is Comming From PhotoUploader Function, Second AddedPhotos is Coming From Above Defined State */}
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          {preInput('Description', 'Description of the place')}
          <textarea
            className="mt-2"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          {preInput('Perks', 'select all the perks of your place')}
          <div className="gap-2 mt-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <Perks selectedPerks={perks} onChange={setPerks} />
          </div>
          {preInput('Extra info', 'house rules, etc')}
          <textarea
            className="mt-2"
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
          {preInput(
            'Check in&out times, Max guests',
            'Add check in and out times, remember to have some time window for cleaning the room between guests'
          )}
          <div className="grid gap-2 sm:grid-cols-3">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                type="text"
                placeholder="14"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              ></input>
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="text"
                placeholder="11"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              ></input>
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guest</h3>
              <input
                type="text"
                value={maxGuest}
                onChange={(ev) => setMaxGuest(ev.target.value)}
              ></input>
            </div>
          </div>
          <div className="">
            <button className="primary my-4">Save</button>
          </div>
        </form>
      )}
    </div>
  );
}
