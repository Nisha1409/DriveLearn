import Head from 'next/head';
import HomePage from '@/components/HomePage/HomePage';

export default function Home() {
  return (
    <>
      <Head>
        <title>Drive Learn | AI-Powered Education</title>
        <meta name="description" content="Enhance your learning experience with AI-powered tutoring." />
      </Head>
      <HomePage />
    </>
  );
}
