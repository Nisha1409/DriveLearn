import React from 'react';
import { Button } from '@mui/material';

const HomeButton = (props: any) => {
  const { text } = props;
  
  return (
    <Button
      variant="contained"
      className="bg-[#25323B] hover:bg-[#1F2B33] hover:opacity-90 text-white mt-3 px-4 py-2 ease-in duration-200 transition-all rounded-md shadow-md
        text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      fullWidth
      type="submit"
    >
      {text}
    </Button>
  );
};

export default HomeButton;
