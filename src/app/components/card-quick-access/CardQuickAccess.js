import styles from './CardQuickAccess.module.scss'
import favoriteMusicsIcon from '../../../public/icons/favorite-musics-icon.svg'

export default function CardQuickAccess (
    {   
        imgSrc = favoriteMusicsIcon.src, 
        title = "", 
        description,
        id, 
        onClick,
        active = false}
    ) {

    let titleFormatted;
    
    if(title.length > 30) {
        titleFormatted = title.slice(0,30) + "..."
    } else {
        titleFormatted = title;
    }
    return (
        <div 
            className={
                `${styles["card-quick-access"]} 
                 ${active ? styles["card-quick-access-active"] : ""}`}
            onClick={() => onClick(id)}
            data-testid={id}>
            <img src={imgSrc} />
            <div>
                <p>{titleFormatted}</p>
                <span>{description  === "track" ? "Música" : description}</span>
            </div>
        
        </div>
    )
}