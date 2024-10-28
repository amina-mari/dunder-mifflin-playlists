"use client"
import styles from './OAuthComponent.module.scss'

export default function OAuthComponent () {
    return (
        <button 
            className={styles["oauth-button"]}
            data-testid="oAuth"></button>
    )
}