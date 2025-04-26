import React from 'react';
import { Button } from '@mui/material';

const SecondButton = (props: any) => {
  const { text } = props;

  return (
    <Button
      variant="text"
      className="bg-[#25323B] hover:bg-[#1F2B33] hover:opacity-80 text-black px-6 py-2 mt-3
      ease-in duration-200 transition-all shadow-md rounded-md text-sm sm:text-base md:text-lg lg:text-xl"
      fullWidth
      sx={{ border: 1 }}
      type="button"
    >
      {text}
    </Button>
  );
};

export default SecondButton;
