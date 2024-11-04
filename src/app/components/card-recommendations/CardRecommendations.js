import userSongsIcon from '../../../public/icons/user-songs-icon.svg'
import styles from './CardRecommendations.module.scss'

export default function CardRecommendations ({imgSrc = userSongsIcon, title, id, onClick}) {
    return (
        <div 
            className={styles["card"]}
            onClick={() => {onClick(id)}}>
            <img src={imgSrc}/>
            {title}
        </div>
    )
}