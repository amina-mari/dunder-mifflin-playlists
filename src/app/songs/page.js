"use client"

import {useSession} from 'next-auth/react'
import { useEffect, useState } from 'react';

import styles from './page.module.scss'
import Navbar from '../components/navbar/Navbar';
import BackForthButton from '../components/back-forth-button/BackForthButton';
import Title from '../components/title/title'
import Card from '../components/card/Card';
import CardPlaylist from '../components/card-playlist/CardPlaylist';
import PlaylistTrack from '../components/playlist-track/PlaylistTrack';

import fetchArtists from '@/utils/fetchArtists/fetchArtists';
import fetchLatestTracks from '@/utils/fetchLatestTracks/fetchLatestTracks';
import fetchRecommendations from '@/utils/fetchRecommendations/fetchRecommendations';
import fetchPlaylists from '@/utils/fetchPlaylists/fetchPlaylists';
import fetchPlaylist from '@/utils/fetchPlaylist/fetchPlaylist';

import testIcon from '../../public/icons/test-icon.svg'

export default function SongsPage() {
    const {data: session, status} = useSession();
    const [topArtists, setTopArtists] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [latestTracks, setLatestTracks] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [playlist, setPlaylist] = useState({});
    const [show, setShow] = useState("default");
    const [offset, setOffset] = useState();

    let dateHours = new Date(Date.now()).getHours()

    const onClickPlaylist = async (playlistId) => {
        const token = session.token.access_token;

        const playlistResponse = await fetchPlaylist(token, playlistId);

        setShow("playlist");

        const getArtistsNameFormatted = (artistsArray) => {
            let stringArtists = artistsArray.reduce((stringArtists, artist) => 
            stringArtists + artist.name + ", ", "")

            stringArtists = stringArtists.slice(0, stringArtists.length - 2);

            return stringArtists.replace(/,([^,]*)$/, ' e $1')
        }

        const playlistObject = {
            imgSrc: playlistResponse.images[0].url,
            name: playlistResponse.name,
            ownerName: playlistResponse.owner.display_name,
            description: playlistResponse.description,
            tracks: playlistResponse.tracks.items.map((item) => ({
                name: item.track.name,
                id: item.track.id,
                artists: getArtistsNameFormatted(item.track.artists),
                imgSrc: item.track.album.images[0].url
            }))
        }

        setPlaylist(playlistObject)
        console.log(playlistResponse);
    }

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
            <Navbar 
                cards={playlists}
                homeButtonOnClick={() => setShow("default")}
                cardOnClick={onClickPlaylist}/>
            {show === "default" && 
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
                                        key={playlist.id}
                                        id={playlist.id}
                                        onClick={onClickPlaylist}/>
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
                                        id={track.id}
                                        key={track.id}/>
                                    
                                )  : ""}
                        </div>
                    </section>
                    <section className={styles["songs-section"]}>
                        <div className={styles["songs-section-title"]}>
                            <Title level={3}>O que ouvir a seguir</Title>
                            <button>Show all</button>
                        </div>
                        <div className={styles["songs-section-content"]}>
                            {recommendations ? recommendations.map(recItem => 
                                    <Card
                                        imgSrc={recItem.album.images[1].url}
                                        title={recItem.name}
                                        description={recItem.type}
                                        id={recItem.id}
                                        key={recItem.id}/>
                                    
                                )  : ""}
                        </div>
                    </section>
                    <section className={styles["songs-section"]}>
                        <div className={styles["songs-section-title"]}>
                            <Title level={3}>Artistas mais ouvidos</Title>
                            <button>Show all</button>
                        </div>
                        <div className={styles["songs-section-content"]}>
                            {topArtists ? topArtists.map(artist => 
                                    <Card
                                        imgSrc={artist.images[2].url}
                                        title={artist.name}
                                        description={artist.type}
                                        id={artist.id}
                                        key={artist.id}/>
                                    
                                )  : ""}
                        </div>
                    </section>
                </main>
            }

            {show === "playlist" && 
                <main className={styles["playlist-main"]}>
                    <img src={playlist.imgSrc} alt="" />
                    <Title>{playlist.name}</Title>
                    <p>by {playlist.ownerName}</p>
                    <span>{playlist.description}</span>
                    <section>
                        {playlist.tracks && 
                            playlist.tracks.map((track) => 
                                <PlaylistTrack
                                    key={track.id} 
                                    id={track.id}
                                    imgSrc={track.imgSrc}
                                    name={track.name}
                                    artists={track.artists} />
                            )
                        }
                    </section>

                </main>
            }
            
        </div>
    )
}
