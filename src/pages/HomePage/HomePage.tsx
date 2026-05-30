import React from 'react'
import { useSearchParams } from 'react-router';
import AuthCallbackPage from '../AuthCallbackPage/AuthCallbackPage';
import NewReleases from './components/NewReleases';

const HomePage = () => {
  const [searchParams] = useSearchParams();

  if (searchParams.has("code") || searchParams.has("error")) {
    return <AuthCallbackPage />;
  }

  return <div>
    <NewReleases/>
  </div>;
};

export default HomePage;
