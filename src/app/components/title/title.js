import styles from './title.module.scss';

export default function Title({children, level = 1}) {
    switch(level) {
        case 1: return (
            <h1 className={styles["main-title"]}>{children}</h1>
        )
        case 2: return (
            <h2 className={styles["subtitle"]}>{children}</h2>
        )
        case 3: return (
            <h3 className={styles["subtitle-h3"]}>{children}</h3>
        )
    }
}