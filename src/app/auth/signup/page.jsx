'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const page = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [rememberMe, setRememberMe] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object from state
    const data = new FormData();
    data.append('email', formData.email);
    data.append('password', formData.password);

    // Debug: Log FormData values
    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Sign up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-[#224957] border-none text-white placeholder:text-white rounded-md px-4"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-[#224957] border-none text-white placeholder:text-white rounded-md px-4"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-[#224957] border-none text-white placeholder:text-white rounded-md px-4"
            />
          </div>

          <Button className="w-full bg-[#2bd17e] font-bold text-[16px]">
            Proceed{' '}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default page;
