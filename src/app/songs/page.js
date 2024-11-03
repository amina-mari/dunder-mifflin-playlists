"use client"

import {useSession} from 'next-auth/react'
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import BackForthButton from '../components/back-forth-button/BackForthButton';
import styles from './page.module.scss'
import UserImageComponent from '../components/user-image-component/UserImageComponet';
import Title from '../components/title/title'
import Card from '../components/card/Card';
import CardRecommendations from '../components/card-recommendations/CardRecommendations';

export default function SongsPage() {
    const {data: session, status} = useSession();
    const [topArtists, setTopArtists] = useState();
    const [recommendations, setRecommendations] = useState();
    const [latestTracks, setLatestTracks] = useState();

    let dateHours = new Date(Date.now()).getHours()

    const fetchArtists = async () => {
        try {
            let response = await fetch(`https://api.spotify.com/v1/me/top/artists?offset=0&limit=5`, {
                headers: {
                    Authorization: `Bearer ${session.token.access_token}`
                }
            })

            let artists = await response.json();
            
            return artists.items;
        } catch (error) {
            console.log(error)
        }

    }

    const fetchLatestTracks = async () => {
        let responseLatestTracks = await fetch(`https://api.spotify.com/v1/me/top/tracks?offset=0&limit=5&time-range=short_term`, {
            headers: {
                Authorization: `Bearer ${session.token.access_token}`
            }
        })

        let latestTracksJson = await responseLatestTracks.json()

        return latestTracksJson.items;
    }

    const fetchRecommendations = async (artists) => {
        let seedsRecommendations = artists.reduce((stringSeed, artist) => stringSeed += artist.id + ",", "");
        seedsRecommendations = seedsRecommendations.slice(0, -1)

        let responseRecommendations = await fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${seedsRecommendations}&limit=6`, {
            headers: {
                Authorization: `Bearer ${session.token.access_token}`
            }
        })
        let recommendationsJson = await responseRecommendations.json()

        return recommendationsJson.tracks;
    }

    useEffect(() => {
        let ignore = false;
        fetchLatestTracks().then(latestTracks => {
            if(!ignore) setLatestTracks(latestTracks);
        });
        fetchArtists(ignore).then((artists) => {
            fetchRecommendations(artists).then((recommendations)=> {
                if(!ignore) setRecommendations(recommendations)
            })
            if(!ignore) setTopArtists(artists);       
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
                            recommendations ? recommendations.map(recItem => 
                                <CardRecommendations 
                                    imgSrc={recItem.album.images[2].url}
                                    title={recItem.name} 
                                    key={recItem.id}/>
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
