import styles from './Card.module.scss'

export default function Card({imgSrc, title, description}) {
    return (
        <div className={styles["card"]}>
            <img 
                src={imgSrc}
                />
            <p>{title}</p>
            <span>{description}</span>
        </div>
    )
}