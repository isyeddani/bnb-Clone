import PhotosUploader from '../PhotosUploader';
import Perks from '../Perks';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AccountNavigation from '../AccountNavigation';
import { Navigate, useParams } from 'react-router-dom';

export default function PlaceFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(({ data }) => {
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
    });
  }, [id]);
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

  async function submitNewPlace(ev) {
    ev.preventDefault();
    const PlaceData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    // If Id is present then Updating
    if (id) {
      
      await axios.put('/places', {
        id,
        ...PlaceData,
      });
      // if Id not found then creating new place
    } else {
      await axios.post('/places', PlaceData);
    }
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  return (
    <div>
      <AccountNavigation />
      <form onSubmit={submitNewPlace}>
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
          className="mt-2 px-2 py-1"
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
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            ></input>
          </div>
        </div>
        <div className="">
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
}
