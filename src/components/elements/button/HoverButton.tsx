import React from 'react';
import { Button } from '@mui/material';

const HoverButton = (props: any) => {
  const { text } = props;

  return (
    <Button
      className="bg-[#25323B] opacity-80 hover:opacity-70 hover:bg-[#25323B] text-white mt-3 px-4 py-2 rounded-lg shadow-md 
        transition-all duration-200 ease-in text-sm sm:text-base md:text-lg lg:text-xl 
        max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      fullWidth
      type="submit"
    >
      {text}
    </Button>
  );
};

export default HoverButton;
