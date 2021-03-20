import { ThemeProvider } from '@material-ui/styles';
import "tailwindcss/tailwind.css";
import theme from '../config/theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider>
}

export default MyApp
