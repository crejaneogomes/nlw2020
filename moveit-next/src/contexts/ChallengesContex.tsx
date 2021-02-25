import {createContext, ReactNode, useState} from 'react'
import challenges from '../../challenges.json' 

interface ChallengesProviderProps {
    children: ReactNode
}

interface Challenge {
    type: 'body' | 'eye',
    description: string,
    amount: number
}

interface ChallengesContextData {
    level: number,
    challengesCompleted: number,
    currentExperience: number,
    startNewChallenge: () => void,
    levelUp: () => void,
    activeChallenge: Challenge,
    resetChallenge: () => void,
    experienceToNextLevel: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children } : ChallengesProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompletes] = useState(0)

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4,2)

    function levelUp(){
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallenge = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallenge]

        setActiveChallenge(challenge)
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    return (
        <ChallengesContext.Provider value={{level: level,
            challengesCompleted,
            currentExperience,
            startNewChallenge,
            levelUp,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel
        }}
        >
            {children}
        </ChallengesContext.Provider>
    );
    
}