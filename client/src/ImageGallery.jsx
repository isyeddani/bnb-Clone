import { useState } from 'react';

export default function ImageGallery({ place }) {
  const [morePhotos, setMorePhotos] = useState(false);
  //   Display more images on seperate page
  if (morePhotos) {
    return (
      <div className="absolute fixed bg-black text-white min-h-screen inset-0">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <div className="text-2xl mr-36">Photos of {place.title}</div>
            <button
              onClick={() => setMorePhotos(false)}
              className="fixed right-12 top-8 flex gap-1 px-2 py-1 bg-white rounded-xl w-fit shadow shadow-lg shadow-gray-800 text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close Photo
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div className="">
                <img
                  className="rounded-xl"
                  src={`http://localhost:4000/uploads/${photo}`}
                  alt="More Images Not Found"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  className="aspect-square object-cover"
                  src={`http://localhost:4000/uploads/${place.photos[0]}`}
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                className="aspect-square object-cover"
                src={`http://localhost:4000/uploads/${place.photos[1]}`}
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  className="aspect-square object-cover relative top-2  rounded-br-3xl"
                  src={`http://localhost:4000/uploads/${place.photos[2]}`}
                />
              )}
            </div>
          </div>
        </div>
        <button
          className="bg-gray-500 gap-1 flex absolute bottom-4 right-3 px-4 py-1 bg-white rounded-xl w-fit shadow shadow-md shadow-gray-500"
          onClick={() => setMorePhotos(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mt-0.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          Show more photos
        </button>
      </div>
    </div>
  );
}
