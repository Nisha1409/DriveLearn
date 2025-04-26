import React from 'react';
import { Button } from '@mui/material';

const SalonMoverButton = (props: any) => {
  const { text, type } = props;

  return (
    <Button
      size="small"
      className={`font-semibold capitalize px-6 py-2 rounded-xl transition-all ease-in duration-300 shadow-md text-sm sm:text-base md:text-lg lg:text-xl
        ${
          type
            ? 'bg-black text-white hover:bg-gray-800 hover:shadow-lg'
            : 'text-black hover:bg-gray-100 hover:shadow-md'
        }`}
    >
      {text}
    </Button>
  );
};

export default SalonMoverButton;
