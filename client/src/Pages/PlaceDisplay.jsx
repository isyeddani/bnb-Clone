import axios from 'axios';
import react, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookingCard from '../BookingCard';
import ImageGallery from '../ImageGallery';
import AddressLink from '../AddressLink';

export default function PlaceDisplay() {
  const { id } = useParams();
  const [place, setPlace] = useState();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) {
    return;
  }

  return (
    <div className="bg-gray-50 -mx-8 px-8 pt-8 mt-4">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <ImageGallery place={place} />
      {/* Ended: Photo Section */}

      {/* Started: Description Section */}
      <div className="mt-8 grid gap-8 ms:grid-cols-1 grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guest: {place.maxGuest}
        </div>
        {/* Ended: Description Section */}

        {/* Started: Booking Card */}
        <BookingCard place={place} />
      </div>
      {/* Started: Extra Info */}
      <div className="bg-white mt-4 -mx-8 px-8 py-4 border-t">
        <div>
          <h2 className="font-semibold text-2xl mt-4">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 test-sm text-gray-600 leading-5">
          {place.extraInfo}
        </div>
      </div>
      {/* Ended: Extra INfo */}
    </div>
  );
}
