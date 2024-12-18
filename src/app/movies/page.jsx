'use client';

import MovieGrid from '@/components/MovieGrid';
import { Button } from '@/components/ui/button';
import { CirclePlus, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const page = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Movie 1',
      year: 2023,
      image: '/placeholder.jpg?height=400&width=300',
    },
    {
      id: 2,
      title: 'Movie 2',
      year: 2021,
      image: '/placeholder.jpg?height=400&width=300',
    },
    {
      id: 3,
      title: 'Movie 3',
      year: 2021,
      image: '/placeholder.jpg?height=400&width=300',
    },
    {
      id: 4,
      title: 'Movie 4',
      year: 2021,
      image: '/placeholder.jpg?height=400&width=300',
    },
    {
      id: 5,
      title: 'Movie 5',
      year: 2022,
      image: '/placeholder.jpg?height=400&width=300',
    },
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 10;

  if (movies.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-white font-semibold text-[48px] ">
          Your movie list is empty
        </h2>
        <Button className=" bg-[#2bd17e] font-bold text-[16px]">
          Add a new movie
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen  text-white p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-[48px] font-semibold flex items-center  gap-2">
            My movies
            <span>
              <CirclePlus />
            </span>
          </h1>
          <Button
            variant="ghost"
            className="font-bold text-[16px] hover:bg-[#2bd17e]"
            aria-label="Logout"
          >
            Logout
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
