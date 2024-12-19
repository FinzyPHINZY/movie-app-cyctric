'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download } from 'lucide-react';
import { useState } from 'react';

const page = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState('');
  const [publishYear, setPublishYear] = useState('');

  return (
    <div className="h-screen">
      <div className="max-w-5xl mx-auto my-12">
        <h2 className="text-white font-semibold text-[48px] mb-8">
          Create a new movie
        </h2>

        <div className="flex justify-between *:w-[49%] *:border-white">
          <div
            className={`border-2 border-dashed rounded-lg aspect-square max-w-md mx-auto flex items-center justify-center ${
              isDragging
                ? 'border-emerald-500 bg-teal-900/50'
                : 'border-teal-800 bg-#224957]'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              // Handle file drop
            }}
          >
            <div className="text-center p-6 flex flex-col-reverse items-center">
              <p className="text-white mb-2">Drop an image here</p>
              <Download className="text-white" />
            </div>
          </div>

          <div className="max-w-[365px]">
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
              </div>{' '}
            </div>

            <div className="my-24 flex *:w-[48%] justify-between *:py-6">
              <Button variant="outline" className=" bg-[#093545] text-white">
                Cancel
              </Button>
              <Button className="bg-emerald-500 hover:bg-emerald-600">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
