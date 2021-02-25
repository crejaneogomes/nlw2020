import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ChallengesContext } from './ChallengesContex'

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCoutdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeOut : NodeJS.Timeout

export function CountdownContextProvider({children}:CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext) 
    
    const [time, setTime] = useState(0.2*60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)
    const minutes = Math.floor(time/60)
    const seconds = time % 60

    function startCountdown () {
        setIsActive(true)
    }

    function resetCoutdown () {
        setIsActive(false)
        clearInterval(countdownTimeOut)
        setHasFinished(false)
        setTime(25 * 60)
    }

    useEffect( () => {

        if (isActive && time > 0) {
            countdownTimeOut = setTimeout(()=> {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true)
            setIsActive(false);
            startNewChallenge()
        }
        }, [isActive, time]
    )

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCoutdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}