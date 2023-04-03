export default function ({ places, index = 0, className = null }) {
  if (!places.photos.length) {
    return "";
  }

  if (!className) {
    className = "w-32 h-32 object-cover rounded-2xl";
  }

  return (
    <div>
      <img
        className={className}
        src={"http://localhost:4000/uploads/" + places.photos[index]}
        alt="Photo Not Found"
      />
    </div>
  );
}
