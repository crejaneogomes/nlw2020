
import React from "react";
import { GetServerSideProps } from 'next'
import { CompletedChallenges } from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar"
import { Profile } from "../components/Profile";
import Head from "next/head"

import styles from '../styles/pages/Home.module.css'
import { ChallengeBox } from "../components/ChanllengeBox";
import { CountdownContextProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContex";

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number
}
export default function Home(props) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >

      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        <ExperienceBar />
        <CountdownContextProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownContextProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  return {
    props: {
      level: +level,
      currentExperience: +currentExperience,
      challengesCompleted: +challengesCompleted
    }
  }
}