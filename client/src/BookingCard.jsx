export default function BookingCard({place}){
    return (
        <div className="bg-white shadow p-4 rounded-2xl h-fit">
          <h2 className="text-xl text-center mb-1">
            Price: ${place.price}/per night{' '}
          </h2>
          <div className="border rounded-2xl mt-4">
            <div className="flex">
              <div className="px-3 py-4">
                <label>Check in: </label>
                <input type="date"></input>
              </div>
              <div className="px-3 py-4 border-l">
                <label>Check out: </label>
                <input type="date"></input>
              </div>
            </div>
            <div className="flex">
              <div className="px-3 py-4 border-t">
                <label>Number of guests:</label>
                <input type="number" value={1}></input>
              </div>
            </div>
          </div>

          <button className="primary mt-4">Book this place</button>
        </div>
    )
}