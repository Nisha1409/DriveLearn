import React from 'react';
import { Button } from '@mui/material';

const NavbarButton = (props: any) => {
  const { text, type } = props;

  return (
    <Button
      size="small"
      variant="text"
      className={`capitalize font-normal px-4 py-2 text-sm sm:text-base md:text-lg lg:text-xl transition-all ease-in duration-200 rounded-tl-xl rounded-br-xl
        ${
          type
            ? 'bg-mainblack text-white hover:bg-mainblack hover:opacity-80 shadow-md'
            : 'text-black hover:opacity-80 bg-transparent'
        }`}
    >
      {text}
    </Button>
  );
};

export default NavbarButton;
