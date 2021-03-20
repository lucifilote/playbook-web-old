import CircularProgress from '@material-ui/core/CircularProgress';
import Head from 'next/head';
import React from 'react';
import AuthCard from '../components/AuthCard';
import { useAuth } from '../components/AuthProvider';
import HomeAuth from '../components/HomeAuth';

const Home = () => {
  const { user, isLoading } = useAuth();

  return (
    <div className="bg-chevron-pattern h-screen overflow-auto">
      <Head>
        <title>Playbook Admin</title>
      </Head>
      {isLoading && !user && <div className="max-w-sm mx-auto justify-center flex absolute top-2/4 left-2/4 transform -translate-y-2/4 -translate-x-2/4">
        <CircularProgress size="80px" />
      </div>}
      {!user && !isLoading
        ?
        <AuthCard />
        : null
      }
      {user && !isLoading && <>
        <HomeAuth />
      </>}
    </div>
  )
}

export default Home;