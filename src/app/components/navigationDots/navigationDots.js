import styles from './navigationDots.module.scss'

export default function NavigationDots({activeDot = "none"}) {
    
    return (
        <nav className={styles["navigation-dots"]}>
            <div className={activeDot === "login" ? 
            `${styles["nav-dot"]} ${styles["nav-dot_login"]} ${styles["active-dot"]}` 
            : `${styles["nav-dot"]} ${styles["nav-dot_login"]}`}
            data-testid="loginDot"></div>

            <div className={activeDot === "songs" ? 
            `${styles["nav-dot"]} ${styles["nav-dot_songs"]} ${styles["active-dot"]}` 
            : `${styles["nav-dot"]} ${styles["nav-dot_songs"]}`}
            data-testid="songsDot"></div>
        </nav>
    )
}