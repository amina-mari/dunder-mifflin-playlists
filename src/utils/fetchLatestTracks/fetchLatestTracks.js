export default async function fetchLatestTracks (token) {
    let responseLatestTracks = await fetch(`https://api.spotify.com/v1/me/top/tracks?offset=0&limit=5&time-range=short_term`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    let latestTracksJson = await responseLatestTracks.json()

    console.log("Latest Tracks: \n")
    console.log(latestTracksJson.items)

    return latestTracksJson.items;
}