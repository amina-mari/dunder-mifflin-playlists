import styles from './CardQuickAccess.module.scss'

export default function CardQuickAccess (
    {   
        imgSrc, 
        title, 
        description, 
        onClick,
        active = false}
    ) {
    return (
        <div 
            className={
                `${styles["card-quick-access"]} 
                 ${active ? styles["card-quick-access-active"] : ""}`}
            onClick={onClick}>
            <img src={imgSrc} />
            <p>{title}</p>
            <span>{description}</span>
        
        </div>
    )
}