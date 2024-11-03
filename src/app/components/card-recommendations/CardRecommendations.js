import userSongsIcon from './icons/user-songs-icon.svg'
import styles from './CardRecommendations.module.scss'

export default function CardRecommendations ({imgSrc = userSongsIcon, title, onClick}) {
    return (
        <div 
            className={styles["card"]}
            onClick={onClick}>
            <img src={imgSrc}/>
            {title}
        </div>
    )
}