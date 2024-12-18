import Image from 'next/image';

const MovieGrid = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {movies.map(({ id, title, year, image }) => (
        <div key={id} className="bg-[#092c39] p-2 rounded-md">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover w-full h-48 rounded-sm"
            />
          </div>
          <div className="p-2">
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-sm">{year}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
