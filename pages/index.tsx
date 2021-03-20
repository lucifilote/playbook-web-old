import Head from 'next/head';
import React, { useState } from 'react';
import AuthCard from '../components/AuthCard';
import firebase from '../config/firebase';

const Home = () => {
  const [user, setUser] = useState(null);

  firebase.auth()
    .onAuthStateChanged((user) => {
      if (user) {
        firebase.auth().currentUser.getIdTokenResult().then(idTokenResult => {
          console.log(idTokenResult);
        })
        setUser(user);
      } else {
        setUser(null);
      }
    })

  const handleLogout = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  }

  const getRefreshToken = () => {
    firebase.auth().currentUser.getIdTokenResult().then((idTokenResult) => {
      console.log(idTokenResult)
    })
  }

  return (
    <div className="bg-chevron-pattern h-screen">
      <Head>
        <title>Playbook Admin</title>
      </Head>
      {!user
        ?
        <AuthCard />
        :
        <button onClick={handleLogout}>Logout</button>
      }
      {user && <>
        <div>User is loggedIn {user.displayName}</div>
        <button onClick={getRefreshToken}>Refresh token</button>
      </>}
    </div>
  )
}

export default Home;