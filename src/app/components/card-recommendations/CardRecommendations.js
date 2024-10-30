import userSongsIcon from './icons/user-songs-icon.svg'
import styles from './CardRecommendations.module.scss'

export default function CardRecommendations ({imgSrc = userSongsIcon, title}) {
    return (
        <div className={styles["card"]}>
            <img src={imgSrc}/>
            {title}
        </div>
    )
}