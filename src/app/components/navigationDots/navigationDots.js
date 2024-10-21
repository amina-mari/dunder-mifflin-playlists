import styles from './navigationDots.module.scss'

export default function NavigationDots({activeDot = "none"}) {
    
    return (
        <nav className={styles["navigation-dots"]}>
            <div className={activeDot === "login" ? 
            `${styles["nav-dot"]} ${styles["nav-dot_login"]} ${styles["active-dot"]}` 
            : `${styles["nav-dot"]} ${styles["nav-dot_login"]}`}></div>

            <div className={activeDot === "home" ? 
            `${styles["nav-dot"]} ${styles["nav-dot_home"]} ${styles["active-dot"]}` 
            : `${styles["nav-dot"]} ${styles["nav-dot_home"]}`}></div>
        </nav>
    )
}