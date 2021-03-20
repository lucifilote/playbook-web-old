import { Tab, Tabs } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import TabPanel from '../components/TabPanel';
import firebase from '../config/firebase';

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  firebase.auth()
    .onAuthStateChanged((user) => {
      /*  if (callback) {
         metadataRef.off('value', callback);
       } */

      if (user) {
        // Check if refresh is required.
        /*    metadataRef = firebase.database().ref('metadata/' + user.uid + '/refreshTime');
           callback = (snapshot) => {
             // Force refresh to pick up the latest custom claims changes.
             // Note this is always triggered on first call. Further optimization could be
             // added to avoid the initial trigger when the token is issued and already contains
             // the latest claims.
             user.getIdToken(true);
           }; */
        firebase.auth().currentUser.getIdTokenResult().then(idTokenResult => {
          console.log(idTokenResult);
        })
        setUser(user);
        console.log(user);
        setLoggedIn(true)
      } else {
        setUser(null);
        setLoggedIn(false)
      }
    })

  const handleLogout = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        setLoggedIn(false);
        setUser(null);
      });
  }

  const getRefreshToken = () => {
    firebase.auth().currentUser.getIdTokenResult().then((idTokenResult) => {
      console.log(idTokenResult)
    })
  }

  const handleChange = (ev, value) => {
    setActiveTab(value);
  }
  return (
    <div className="bg-chevron-pattern h-screen">
      <Head>
        <title>Playbook Admin</title>
      </Head>
      {!loggedIn
        ?
        <div className="py-16 max-w-sm mx-auto bg-white rounded-xl shadow-md items-center space-x-4 absolute top-2/4 left-2/4 transform -translate-y-2/4 -translate-x-2/4">
          <div className="flex flex-col">
            <Image className="" src="/images/logo.png" alt="Playbook Logo" width="210" height="95" objectFit="contain" />

            <div className="p-6">
              <Tabs
                value={activeTab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Login" />
                <Tab label="Register" />
              </Tabs>
              <TabPanel value={activeTab} index={0}>
                <TextField
                  id="outlined-helperText"
                  label="Helper text"
                  variant="outlined"
                />
              </TabPanel>
              <TabPanel value={activeTab} index={1}>
                Item Two
              </TabPanel>
            </div>
          </div>
        </div>
        :
        <button onClick={handleLogout}>Logout</button>
      }
      {loggedIn && <>
        <div>User is loggedIn {user.displayName}</div>
        <button onClick={getRefreshToken}>Refresh token</button>
      </>}
    </div>
  )
}

export default Home;