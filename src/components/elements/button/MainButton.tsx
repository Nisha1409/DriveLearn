import React from 'react';
import { Button } from '@mui/material';

const MainButton = (props: any) => {
  const { text } = props;

  return (
    <Button
      variant="text"
      className="bg-[#25323B] hover:bg-[#1F2B33] hover:opacity-80 text-white mt-3 px-4 py-2 rounded-md shadow-md 
        transition-all duration-200 ease-in text-sm sm:text-base md:text-lg lg:text-xl 
        max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      fullWidth
      type="submit"
    >
      {text}
    </Button>
  );
};

export default MainButton;
