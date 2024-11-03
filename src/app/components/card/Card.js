import styles from './Card.module.scss'

export default function Card(
        {
            imgSrc, 
            title, 
            description,
            id,
            onClick
        }
    ) {
    return (
        <div 
            className={styles["card"]}
            onClick={() => onClick(id)}>
            <img 
                src={imgSrc}
                />
            <p>{title}</p>
            <span>{description  === "track" ? "Música" : "Artista"}</span>
        </div>
    )
}