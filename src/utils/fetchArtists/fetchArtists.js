export default async function fetchArtists (token) {
    try {
        let response = await fetch(`https://api.spotify.com/v1/me/top/artists?offset=0&limit=5`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        let artists = await response.json();
        console.log("Artists: \n")
        console.log(artists.items)

        return artists.items;
    } catch (error) {
        console.log(error)
    }

}