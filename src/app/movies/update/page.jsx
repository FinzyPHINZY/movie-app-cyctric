'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getMovie, updateMovie } from '@/lib/API';
import { useAuth } from '@/lib/AuthProvider';
import { Download } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = () => {
  const searchParams = useSearchParams();
  const { userData } = useAuth();
  const token = userData?.token;
  const id = searchParams.get('id');
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [poster, setPoster] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await getMovie(token, id);

      if (response?.success) {
        const { title, publishYear, poster } = response.data;
        setTitle(title);
        setPublishYear(publishYear);
        setPoster(poster);
      }
    };

    fetchMovie();
  }, [token]);

  const handleSubmit = async () => {
    try {
      const movie = {
        id,
        title,
        publishYear,
        poster,
      };

      const response = await updateMovie(token, movie);
      console.log('response from update', response);

      if (response.success) {
        alert('Updated movie successfully');
        // router.refresh();
      } else {
        alert('Failed to update movie. Try again!');
      }
    } catch (error) {
      console.log('Failed to call api');
    }
  };

  return (
    <div className="h-screen p-4">
      <div className="max-w-5xl mx-auto my-12">
        <h2 className="text-white font-semibold text-[32px] md:text-[48px] mb-8">
          Edit
        </h2>

        <div className="flex flex-col md:flex-row  justify-between *:w-full md:*:w-[49%] *:border-white">
          <div
            className={`border-2 border-dashed rounded-lg aspect-square max-w-md mx-auto flex items-center justify-center ${
              isDragging
                ? 'border-emerald-500 bg-teal-900/50'
                : 'border-teal-800 bg-[#224957]'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
          >
            <div className="text-center p-6 flex flex-col-reverse items-center">
              {' '}
              {poster && (
                <Image src={poster} width={50} height={50} alt="movie-banner" />
              )}
              <p className="text-white my-2">Drop an image here</p>
              <Download className="text-white" />
            </div>
          </div>

          <div className="max-w-[365px] mt-8">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="">
                  <Input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-[#224957] border-none text-white placeholder:text-white rounded-md px-4"
                  />
                </div>
                <div className="">
                  <Input
                    type="text"
                    placeholder="Publishing Year"
                    value={publishYear}
                    onChange={(e) => setPublishYear(e.target.value)}
                    className="bg-[#224957] border-none text-white placeholder:text-white rounded-md px-4 w-[60%]"
                  />
                </div>
              </div>
              <div className="my-24 flex *:w-[48%] justify-between *:py-6">
                <Button variant="outline" className=" bg-[#093545] text-white">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
