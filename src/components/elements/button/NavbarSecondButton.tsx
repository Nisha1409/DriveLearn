import React from 'react';
import { Button } from '@mui/material';

const NavbarSecondButton = (props: any) => {
  const { text } = props;

  return (
    <Button
      size="small"
      variant="text"
      className="bg-[#CEB280] font-semibold py-2 px-6 text-sm sm:text-base md:text-lg lg:text-xl text-black capitalize 
      hover:opacity-80 hover:bg-[#D1BA85] rounded-md shadow-md transition-all duration-200 ease-in"
    >
      {text}
    </Button>
  );
};

export default NavbarSecondButton;
