import { useState } from "react";
import { compareAsc, differenceInCalendarDays, format } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function BookingCard({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect,setRedirect] = useState("");
  let numberOfNights = 0;
  // Calculate the Number of Nights between two dates.
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookPlace() {
    const response = await axios.post("/bookings", {
      place: place._id,
      checkIn,
      checkOut,
      numberOfGuest,
      name,
      mobile,
      price: numberOfNights * place.price,
    });
    const bookingid = response.data._id
    setRedirect(`/account/bookings/${bookingid}`);
  }

  if(redirect){
    return <Navigate to={redirect} />
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl h-fit">
      <h2 className="text-xl text-center mb-1">
        Price: ${place.price}/per night{" "}
      </h2>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="px-3 py-4">
            <label>Check in: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            ></input>
          </div>
          <div className="px-3 py-4 border-l">
            <label>Check out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            ></input>
          </div>
        </div>
        <div className="px-3 py-4 border-t">
          <label>Number of guests:</label>
          <input
            type="number"
            value={numberOfGuest}
            onChange={(ev) => setNumberOfGuest(ev.target.value)}
          ></input>
        </div>
        {numberOfNights > 0 && (
          <div className="px-3 py-4 border-t">
            <label>Your full name</label>
            <input
              type="text"
              placeholder="Daniyal Ahmed"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            ></input>
            <label>Your phone number</label>
            <input
              type="tel"
              placeholder=""
              value={mobile}
              onChange={(ev) => setMobile(ev.target.value)}
            ></input>
          </div>
        )}
      </div>
      <button onClick={bookPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && (
          <span> for :${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
}
