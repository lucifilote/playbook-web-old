import { useRouter } from 'next/router';
import React, { useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../../config/firebase';

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotification] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    firebase.auth()
      .signInWithEmailAndPassword(username, password)
      .then(({ user }) => {
        console.log(user);
        return user.getIdToken().then(idToken => {
          console.log(idToken)
        })
      })
      .catch((err) => {

        console.log(err.code, err.message)
        setNotification(err.message)

        setTimeout(() => {
          setNotification('')
        }, 2000)
      })

    setUsername('')
    setPassword('')
    router.push("/")
  }

  return (
    <div>
      <h1>Login</h1>
      {notify}
      <form onSubmit={handleLogin}>
        Email<input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
        <br />
        Password<input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  )

}

export default Login