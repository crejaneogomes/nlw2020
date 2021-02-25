
import React from "react";
import { CompletedChallenges } from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar"
import { Profile } from "../components/Profile";
import Head  from "next/head"

import styles from '../styles/pages/Home.module.css'
import { ChallengeBox } from "../components/ChanllengeBox";
import { CountdownContextProvider } from "../contexts/CountdownContext";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar />
      <CountdownContextProvider>
        <section>
          <div>
            <Profile/>
            <CompletedChallenges/>
            <Countdown/>
          </div>
          <div>
            <ChallengeBox/>
          </div>
        </section>
      </CountdownContextProvider>
    </div>
  )
}
