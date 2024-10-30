import Image from "next/image"
import backIcon from './icons/back-icon.svg'
import forthIcon from './icons/forth-icon.svg'
import styles from './BackForthButton.module.scss'

export default function BackForthButton ({type}) {
    let icon = type === "back" ? backIcon : forthIcon;
    
    return (
        <button
            className={styles["back-forth-button"]}><Image src={icon} alt={`${type} icon`} /></button>
    )
}