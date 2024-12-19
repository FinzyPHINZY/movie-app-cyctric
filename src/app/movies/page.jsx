'use client';

import MovieGrid from '@/components/MovieGrid';
import { Button } from '@/components/ui/button';
import { fetchMovies } from '@/lib/API';
import { useAuth } from '@/lib/AuthProvider';
import { CirclePlus, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = () => {
  const { userData } = useAuth();
  const router = useRouter();

  const token = userData?.token;

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetchMovies(token);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (token) {
      getMovies();
    } else {
      console.log('No token available for fetching movies');
    }
  }, [token]);

  const handleLogout = () => {
    router.push('/auth/login');
  };

  const handleAddMovie = () => {
    router.push('/movies/create');
  };

  const moviesPerPage = 10;

  if (movies.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <h2 className="text-white font-semibold text-[32px] md:text-[48px] text-center mb-8">
          Your movie list is empty
        </h2>
        <Button
          onClick={handleAddMovie}
          className=" bg-[#2bd17e] font-bold text-[16px] cursor-pointer"
        >
          Add a new movie
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-[32px] md:text-[48px] font-semibold flex items-center gap-2">
            My movies
            <CirclePlus onClick={handleAddMovie} className="cursor-pointer" />
          </h1>
          <Button
            variant="ghost"
            className="font-bold text-[16px] hover:bg-[#2bd17e]"
            aria-label="Logout"
            onClick={handleLogout}
          >
            <p className="hidden md:block">Logout</p>
            <LogOut width={32} height={32} className="w-[32px] h-[32px]" />
          </Button>
        </header>

        <MovieGrid movies={movies} />

        <div className="flex justify-center gap-2 mt-8 *:font-bold *:text-[16px]">
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          >
            Prev
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="border-teal-800 bg-[#2bd17e] text-white"
          >
            1
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-none bg-[#092c39]"
          >
            2
          </Button>

          <Button
            variant="ghost"
            size="sm"
            disabled={(currentPage + 1) * moviesPerPage >= movies.length}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
