import userSongsIcon from '../../../public/icons/user-songs-icon.svg'
import styles from './CardPlaylist.module.scss'

export default function CardPlaylist ({imgSrc = userSongsIcon, title, id, onClick}) {
    return (
        <div 
            className={styles["card"]}
            onClick={() => {onClick(id)}}>
            <img src={imgSrc}/>
            {title}
        </div>
    )
}