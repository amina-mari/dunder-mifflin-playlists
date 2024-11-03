import Image from 'next/image';
import homeIcon from './icons/home-icon.svg'
import userLibraryIcon from './icons/user-library-icon.svg'
import searchIcon from './icons/search-icon.svg'
import styles from './NavButton.module.scss'

export default function NavButton({type, active, setActive}) {
    let text = "";
    let icon;

    switch(type) {
        case "home":
            text = "Home"
            icon = homeIcon;
            break;
        case "search":
            text = "Busca"
            icon = searchIcon;
            break;
        case "user-library":
            text = "Sua Biblioteca"
            icon = userLibraryIcon;
            break;
        default:
            text = "Opção Inválida";
            break;
    }
    
    return (
        <button
            onClick={() => setActive(type) }
            className={`${styles["nav-button"]} ${active === type ? styles["nav-button-active"] : ""}`}>
                <Image 
                    src={icon} 
                    alt={`${type} icon`} 
                    data-testid={`${type}-icon`}/>
                {text}
        </button>
    )
}