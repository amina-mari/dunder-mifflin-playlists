import {useSession} from 'next-auth/react'
import { useEffect, useState } from 'react';

export default function SongsPage() {
    const {data: session, status} = useSession();
    const [topArtists, setTopArtists] = useState();

    const fetchArtists = async (ignore) => {
        let response = await fetch("https://api.spotify.com/v1/me/top/artists", {
            headers: {
                Authorization: `Bearer ${session.token.access_token}`
            }
        })

        let artists = await response.json();

        if(!ignore) {
            setTopArtists(artists);
        }
    }

    useEffect(() => {
        let ignore = false;

        fetchArtists(ignore)        

        return () => {
            ignore = true;
        }
    }, [])

    return (
        <h1>Listening!</h1>
    )
}
