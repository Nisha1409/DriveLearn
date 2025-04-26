import React from 'react';
import { Button } from '@mui/material';

const YellowButton = (props: any) => {
  const { text } = props;

  return (
    <Button
      variant="text"
      size="small"
      className="bg-[#CEB281] hover:bg-[#D1BA85] hover:opacity-80 capitalize 
      text-sm sm:text-base md:text-lg lg:text-xl text-black py-2 px-6 font-medium shadow-md rounded-md
      transition-all duration-200 ease-in"
    >
      {text}
    </Button>
  );
};

export default YellowButton;
