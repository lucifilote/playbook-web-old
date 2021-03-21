import CircularProgress from '@material-ui/core/CircularProgress';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import AuthCard from '../components/AuthCard';
import { useAuth } from '../components/AuthProvider';

const Home = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter()

  useEffect(() => {
    if (user && !isLoading) {
      router.push('/user');
    }
  }, [user, isLoading])

  return (
    <div className="bg-chevron-pattern h-screen overflow-auto">
      <Head>
        <title>Playbook Admin</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c"></meta>
      </Head>
      {isLoading && !user && <div className="max-w-sm mx-auto justify-center flex absolute top-2/4 left-2/4 transform -translate-y-2/4 -translate-x-2/4">
        <CircularProgress size="80px" />
      </div>}
      {!user && !isLoading
        ?
        <AuthCard />
        : null
      }
    </div>
  )
}

export default Home;