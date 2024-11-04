import Image from "next/image"
import backIcon from '../../../public/icons/back-icon.svg'
import forthIcon from '../../../public/icons/forth-icon.svg'
import styles from './BackForthButton.module.scss'

export default function BackForthButton ({type, onClick}) {
    let icon = type === "back" ? backIcon : forthIcon;
    
    return (
        <button
            className={styles["back-forth-button"]}
            data-testid={`${type}Button`}
            onClick={() => onClick(type)}>
                <img src={icon.src} alt={`${type} icon`} />
        </button>
    )
}