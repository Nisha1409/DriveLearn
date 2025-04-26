import React from 'react';
import { TextField } from '@mui/material';

const FormInput = () => {
  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto my-4">
      <TextField
        size="small"
        variant="outlined"
        className="w-full"
        fullWidth
        placeholder="Enter text..."
      />
    </div>
  );
};

export default FormInput;
