import React from 'react';
import { Button } from '@mui/material';

const HomeMainButton = (props: any) => {
  const { text } = props;

  return (
    <Button
      variant="text"
      className="bg-mainblack hover:bg-[#EEE0C5] 
      border-2 hover:border-[#BEA06A] font-medium shadow-lg rounded-sm py-2 px-4 text-white hover:text-black mt-3
      ease-in duration-200 transition-all text-sm sm:text-base md:text-lg lg:text-xl
      max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      fullWidth
      type="submit"
    >
      {text}
    </Button>
  );
};

export default HomeMainButton;
