import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MovieGrid = ({ movies }) => {
  const router = useRouter();

  const openCard = (id) => {
    router.push(`/movies/update?id=${id}`);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {movies.map(({ id, title, publishYear, poster }) => (
        <div
          key={id}
          className="bg-[#092c39] p-2 rounded-md"
          onClick={() => openCard(id)}
        >
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src={poster}
              alt={title}
              fill
              className="object-cover w-full h-48 rounded-sm"
            />
          </div>
          <div>
            <div className="p-2 flex flex-col justify-end">
              <h3 className="font-medium text-lg">{title}</h3>
              <p className="text-sm">{publishYear}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
