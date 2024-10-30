import NavButton from "../navButton/NavButton"
import CardQuickAccess from "../card-quick-access/CardQuickAccess"
import favMusicIcon from '../card-quick-access/icons/favorite-musics-icon.svg'
import styles from './Navbar.module.scss'

export default function Navbar ({cards = [{
    imgSrc: favMusicIcon,
    title: "Músicas Favoritas",
    description: "Falha ao carregar"
}]}) {

    return (
        <nav className={styles["navbar"]}>
            <NavButton type="home"/>
            <NavButton type="search"/>
            <NavButton type="user-library"/>
            <CardQuickAccess 
                imgSrc={favMusicIcon}
                title="Músicas Favoritas"
                description=""
                />
            {
                cards.map(card =>
                    <CardQuickAccess 
                        imgSrc={card.album?.images[2]?.url}
                        title={card.name}
                        description={card.type}
                        onClick={() => {}}/>
                )
            }
        </nav>
    )
}