import Perks from '../Perks';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Plus from '../Plus.png';
import axios from 'axios';

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
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

  async function addPhotosByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', {
      Link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink('');
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
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add using a link ....jpg"
              value={photoLink}
              onChange={(ev) => setPhotoLink(ev.target.value)}
            ></input>
            <button
              onClick={addPhotosByLink}
              className="bg-gray-200 w-40 rounded-2xl"
            >
              Add&nbsp;photo
            </button>
          </div>
          <div className="grid gap-2 grid-col-3 md:grid-cols-4 lg:grid-cols-6">
            {addedPhotos.length > 0 &&
              addedPhotos.map((link) => (
                <div>
                  <img className='rounded-2xl' src={'http://localhost:4000/uploads/'+link} />
                </div>
              ))}
            <label className="flex items-center p-8 text-2xl text-gray-600 text-center border bg-transparent rounded-2xl cursor-pointer">
              <input type='file' className='hidden'/>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              Upload
            </label>
          </div>
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
