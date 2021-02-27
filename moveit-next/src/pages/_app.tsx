import '../styles/global.css';

import { ChallengesProvider } from '../contexts/ChallengesContex'

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps}/>
  )
}

export default MyApp
