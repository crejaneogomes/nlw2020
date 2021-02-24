import styles from '../styles/components/Profile.module.css'

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/crejaneogomes.png" alt="Claudia Gomes"></img>
            <div>
                <strong>Claudia Gomes</strong>
                <p>
                    <img src="icons/level.svg" alt="level"></img>
                    Level 1
                </p>
            </div>
        </div>
    );
}