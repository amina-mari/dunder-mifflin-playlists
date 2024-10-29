"use client"
import styles from './OAuthComponent.module.scss'
import { signIn } from 'next-auth/react'

export default function OAuthComponent () {
    return (
        <button 
            className={styles["oauth-button"]}
            data-testid="oAuth"
            onClick={() => { 
                try {
                    signIn("spotify") 
                } catch(error) {
                    console.error(error)
                }
            
            }}></button>
    )
}