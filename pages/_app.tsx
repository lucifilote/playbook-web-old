import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import "tailwindcss/tailwind.css";
import AuthProvider from '../components/AuthProvider';
import theme from '../config/theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <ThemeProvider theme={theme}> <AuthProvider><Component {...pageProps} /></AuthProvider></ThemeProvider>
}

export default MyApp
