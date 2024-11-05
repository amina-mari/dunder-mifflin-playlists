"use client"

import {useSession} from 'next-auth/react'
import { useEffect, useState } from 'react';

import styles from './page.module.scss'
import Navbar from '../components/navbar/Navbar';
import BackForthButton from '../components/back-forth-button/BackForthButton';
import Title from '../components/title/title'
import Card from '../components/card/Card';
// import CardRecommendations from '../components/card-recommendations/CardRecommendations';
import CardPlaylist from '../components/card-playlist/CardPlaylist';

import fetchArtists from '@/utils/fetchArtists/fetchArtists';
import fetchLatestTracks from '@/utils/fetchLatestTracks/fetchLatestTracks';
import fetchRecommendations from '@/utils/fetchRecommendations/fetchRecommendations';
import fetchPlaylists from '@/utils/fetchPlaylists/fetchPlaylists';

import testIcon from '../../public/icons/test-icon.svg'

export default function SongsPage() {
    const {data: session, status} = useSession();
    const [topArtists, setTopArtists] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [latestTracks, setLatestTracks] = useState([]);
    const [playlists, setPlaylists] = useState([])
    const [offset, setOffset] = useState();

    let dateHours = new Date(Date.now()).getHours()

    useEffect(() => {
        let ignore = false;
        const token = session.token.access_token;
        fetchLatestTracks(token).then(latestTracks => {
            if(!ignore) setLatestTracks(latestTracks);
        });
        fetchArtists(token).then((artists) => {
            fetchRecommendations(token, artists).then((recommendations)=> {
                if(!ignore) setRecommendations(recommendations)
            })
            if(!ignore) setTopArtists(artists);       
        });

        fetchPlaylists(token).then(playlists => {
            if(!ignore) setPlaylists(playlists)
        });

        return () => {
            ignore = true;
        }
    }, [])

    return (
        <div className={styles["songs-page"]}>
            <Navbar cards={recommendations}/>
            <main>
                <nav>
                    <div>
                        <BackForthButton type="back"/>
                        <BackForthButton type="forth" />
                    </div>
                    <img src="" alt="" />
                </nav>
                <section className={styles["songs-section"]}>
                    <Title level={2}>{
                        dateHours > 5 && dateHours < 12 ? "Bom dia!" : 
                        dateHours < 18 ? "Boa Tarde!" : "Boa noite!"
                    }</Title>
                    <div className={styles["songs-section-content"]}>
                        {
                            playlists ? playlists.map(playlist => 
                                <CardPlaylist 
                                    imgSrc={playlist.images ? playlist.images[0].url : testIcon.src}
                                    title={playlist.name} 
                                    key={playlist.id}/>
                            ) : ""
                        }
                    </div>
                </section>
                <section className={styles["songs-section"]}>
                    <div className={styles["songs-section-title"]}>
                        <Title level={3}>Tocadas recentemente</Title>
                        <button>Show all</button>
                    </div>
                    <div className={styles["songs-section-content"]}>
                        {latestTracks ? latestTracks.map(track => 
                                <Card
                                    imgSrc={track.album.images[1].url}
                                    title={track.name}
                                    description={track.type}
                                    key={track.id}/>
                                
                            )  : ""}
                    </div>
                </section>
                <section className={styles["songs-section"]}>
                    <div className={styles["songs-section-title"]}>
                        <Title level={3}>Mais ouvidas</Title>
                        <button>Show all</button>
                    </div>
                    <div className={styles["songs-section-content"]}>
                        {topArtists ? topArtists.map(artist => 
                                <Card
                                    imgSrc={artist.images[2].url}
                                    title={artist.name}
                                    description={artist.type}
                                    key={artist.id}/>
                                
                            )  : ""}
                    </div>
                </section>
            </main>
        </div>
    )
}
