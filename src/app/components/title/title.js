import styles from './title.module.scss';

export default function Title({children}) {
    return (
        <h1 className={styles["main-title"]}>{children}</h1>
    )
}