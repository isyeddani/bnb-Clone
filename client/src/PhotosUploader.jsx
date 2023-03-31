import { useState } from 'react';
import axios from 'axios';

export default function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState('');

  // Add Photo By Link
  async function addPhotosByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', {
      Link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink('');
  }

  // Add Photo By File
  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios
      .post('/upload', data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then((res) => {
        const { data: filenames } = res;
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  return (
    <>
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
            <div className="xl:h-48 h-32 flex" key={link}>
              <img
                className="rounded-2xl w-full object-cover"
                src={'http://localhost:4000/uploads/' + link}
              />
            </div>
          ))}
        <label className=" xl:h-48 h-32 flex items-center justify-center text-2xl text-gray-600 text-center border bg-transparent rounded-2xl cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
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
    </>
  );
}
