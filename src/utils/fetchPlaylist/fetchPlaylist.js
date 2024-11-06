export default async function fetchPlaylist(token, playlistId) {
    try {
        let response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        let playlist = await response.json();
        console.log("Playlist: \n")
        console.log(playlist)

        return playlist;
    } catch (error) {
        console.log(error)
    }

}