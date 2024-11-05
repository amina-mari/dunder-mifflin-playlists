export default async function fetchPlaylists (token) {
    try {
        let responseUser = await fetch(`https://api.spotify.com/v1/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        let {id: user_id} = await responseUser.json();
        
        let responsePlaylists = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists?offset=0&limit=5`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        let responsePlaylistsJson = await responsePlaylists.json()

        console.log("Playlists")
        console.log(responsePlaylistsJson.items);

        return responsePlaylistsJson.items

    } catch (error) {
        console.log(error)
    }

}