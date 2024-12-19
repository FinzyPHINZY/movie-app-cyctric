'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createMovie } from '@/lib/API';
import { useAuth } from '@/lib/AuthProvider';
import { Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const page = () => {
  const router = useRouter();
  const { userData } = useAuth();
  const token = userData?.token;
  const [isDragging, setIsDragging] = useState(false);
  const [title, setTitle] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (file) => {
    setImage(file);
  };

  const handleCancel = () => {
    setTitle('');
    setPublishYear('');
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('publishYear', publishYear);
      formData.append('poster', image);

      const response = await createMovie(token, formData);

      if (response.success) {
        router.push('/movies');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen px-4">
      <div className="max-w-5xl mx-auto my-12">
        <h2 className="text-white font-semibold text-[32px] md:text-[48px] mb-8">
          Create a new movie
        </h2>

        <div className="flex flex-col md:flex-row justify-between *:w-full md:*:w-[49%] *:border-white">
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
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleFileUpload(e.dataTransfer.files[0]);
              }
            }}
          >
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              className="hidden"
              id="fileInput"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />
            <label
              htmlFor="fileInput"
              className="text-center p-6 flex flex-col justify-center items-center cursor-pointer"
            >
              <p className="text-white mb-2">
                Drop an image here or click to select
              </p>
              <Download className="text-white" />
            </label>
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
                  <span onClick={handleCancel}>Cancel</span>
                </Button>

                <Button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  {loading ? 'Loading' : 'Submit'}
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
