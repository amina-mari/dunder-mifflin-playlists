import NavButton from "../navButton/NavButton"
import CardQuickAccess from "../card-quick-access/CardQuickAccess"
import favMusicIcon from '../../../public/icons/favorite-musics-icon.svg'
import styles from './Navbar.module.scss'

export default function Navbar ({cards, cardOnClick, userMusicsOnClick}) {

    return (
        <nav className={styles["navbar"]}>
            <NavButton type="home"/>
            <NavButton type="search"/>
            <NavButton type="user-library"/>
            <CardQuickAccess 
                title="Músicas Favoritas"
                description=""
                onClick={userMusicsOnClick}
                />
            {cards &&
                cards.map(card =>
                    <CardQuickAccess 
                        imgSrc={card.images[0]?.url}
                        title={card.name}
                        description={card.type}
                        id={card.id}
                        onClick={cardOnClick}
                        key={"nav" + card.id}/>
                )
            }
        </nav>
    )
}