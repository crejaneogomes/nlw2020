import {createContext, ReactNode, useEffect, useState} from 'react'
import  Cookies  from 'js-cookie';
import challenges from '../../challenges.json' 
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
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
    experienceToNextLevel: number,
    completeChallenge: () => void,
    closeLevelModal: () => void
}


export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ 
    children,
    ...rest
    } : ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompletes] = useState(rest.challengesCompleted ?? 0)

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    
    const experienceToNextLevel = Math.pow((level + 1) * 4,2)

    useEffect(()=> {
        Notification.requestPermission()
    }, [])

    useEffect(()=> {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level,currentExperience,challengesCompleted])

    function levelUp(){
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    function closeLevelModal(){
        setIsLevelUpModalOpen(false)
    }

    function startNewChallenge() {
        const randomChallenge = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallenge]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()
        if (Notification.permission === 'granted'){
            new Notification('Novo desafio 🎉', {
                body: `valendo ${challenge.amount} xp` 
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if(!activeChallenge){
            return;
        } 

        const {amount} = activeChallenge

        let finalExperience = currentExperience + amount

        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompletes(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider value={{level: level,
            challengesCompleted,
            currentExperience,
            startNewChallenge,
            levelUp,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallenge,
            closeLevelModal
        }}
        >
            {children}
            {isLevelUpModalOpen && (
                <LevelUpModal/>
            )}
        </ChallengesContext.Provider>
    );
    
}