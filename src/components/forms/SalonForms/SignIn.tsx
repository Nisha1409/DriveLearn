import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Head from 'next/head';
import MainButton from '@/components/elements/button/MainButton';
import TextField from '@mui/material/TextField';
import Link from 'next/link';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be at least 8 characters long').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
  board: yup.string().oneOf(['CBSE', 'ICSE', 'State'], 'Select a valid board').required('Board selection is required'),
});

const Signup = () => {
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '', board: '' },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (res.ok) window.location.href = '/login';
        else alert((await res.json()).message || 'Signup failed');
      } catch (err) {
        console.error('Signup error:', err);
      }
    },
  });

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-mainbg min-h-screen flex flex-col md:flex-row justify-center items-center px-8 sm:px-12 md:px-16 lg:px-20">
        <div className="w-full md:w-[45%] max-w-xs sm:max-w-sm md:max-w-lg text-center md:text-left bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <h2 className="text-3xl font-bold mb-3 text-gray-800">Welcome To AI Tutor</h2>
          <p className="text-gray-600 text-base sm:text-lg mb-6">Create your account</p>

          <form className="space-y-5" onSubmit={formik.handleSubmit}>
            {['name', 'email', 'password', 'confirmPassword'].map((field) => (
              <TextField
                key={field}
                size="small"
                variant="outlined"
                fullWidth
                id={field}
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                type={field.includes('password') ? 'password' : 'text'}
                value={formik.values[field as keyof typeof formik.values] || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched[field as keyof typeof formik.touched] && formik.errors[field as keyof typeof formik.errors])}
                helperText={formik.touched[field as keyof typeof formik.touched] ? formik.errors[field as keyof typeof formik.errors] : ""}
              />
            ))}

            <MainButton text="Sign Up" />
            <p className="text-sm mt-4">Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link></p>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden md:block w-[50%] flex items-center justify-center">
          <img src="/images/projectSignIn.jpg" alt="Signup Visual" className="max-w-full h-auto rounded-lg shadow-md hover:scale-105 transition-all duration-300" />
        </div>
      </div>
    </>
  );
};

export default Signup;
