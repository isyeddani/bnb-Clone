import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddressLink from '../AddressLink';
import ImageGallery from '../ImageGallery';
import BookingDates from '../BookingDates';
import { differenceInCalendarDays } from 'date-fns';

export default function DisplayBooking() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      // Filter out the required bookings from all the bookings
      axios.get('bookings/data').then((response) => {
        const temp = response.data.find(
          ({ _id }) => _id === id // find the booking from all booking with the help of id
        );
        if (temp) {
          setBooking(temp);
        }
      });
    }
  }, []);

  if (!booking) {
    return '';
  }

  return (
    <div className="my-8">
      <div></div>
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink>{booking.place.address}</AddressLink>
      <div className="flex justify-between items-center bg-gray-200 my-6 p-6 rounded-2xl">
        <div>
          <h2 className="text-2xl">Your Booking Information</h2>
          <BookingDates booking={booking} />
          <div className="flex">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-4 mr-1 mt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </div>
            <div>
              {differenceInCalendarDays(
                new Date(booking.checkOut),
                new Date(booking.checkIn)
              )}{' '}
              nigths
            </div>
          </div>
        </div>
        {/* Booking Price */}
        <div className="self-center gap-1 font-semibold bg-primary p-6 rounded-2xl text-white">
          <div className="text-center">Total price:</div>
          <div className="text-center text-3xl">${booking.price}</div>
        </div>
      </div>

      <ImageGallery place={booking.place} />
    </div>
  );
}
