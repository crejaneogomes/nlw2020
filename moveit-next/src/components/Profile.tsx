import styles from '../styles/components/Profile.module.css'
import { ChallengesContext } from '../contexts/ChallengesContex'
import { useContext } from 'react';

export function Profile() {
    const {level} = useContext(ChallengesContext)
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/crejaneogomes.png" alt="Claudia Gomes"></img>
            <div>
                <strong>Claudia Gomes</strong>
                <p>
                    <img src="icons/level.svg" alt="level"></img>
                    Level {level}
                </p>
            </div>
        </div>
    );
}