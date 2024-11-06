"use client"

import NavButton from "../navButton/NavButton"
import CardQuickAccess from "../card-quick-access/CardQuickAccess"
import favMusicIcon from '../../../public/icons/favorite-musics-icon.svg'
import styles from './Navbar.module.scss'
import { useState } from "react"

export default function Navbar ({cards, cardOnClick, userMusicsOnClick, homeButtonOnClick}) {
    const [activeButton, setActiveButton] = useState("home");

    const setActive = (type) => {
        if(type === "home") {
            setActiveButton(type)
            homeButtonOnClick()
        } 
        else if(type === "search") {
            setActiveButton(type)
        }
        else if(type === "search") {
            setActiveButton(type)
        }
        else {
            setActiveButton(type)
            cardOnClick(type);
        }
    }

    return (
        <nav className={styles["navbar"]}>
            <NavButton active={activeButton} setActive={setActive} type="home" onClick={homeButtonOnClick} />
            <NavButton active={activeButton} setActive={setActive} type="search"/>
            <NavButton active={activeButton} setActive={setActive} type="user-library"/>
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
                        onClick={setActive}
                        active={activeButton}
                        key={"nav" + card.id}/>
                )
            }
        </nav>
    )
}