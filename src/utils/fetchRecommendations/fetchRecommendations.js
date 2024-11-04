export default async function fetchRecommendations (token, artists) {
    let seedsRecommendations = artists.reduce((stringSeed, artist) => stringSeed += artist.id + ",", "");
    seedsRecommendations = seedsRecommendations.slice(0, -1)

    let responseRecommendations = await fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${seedsRecommendations}&limit=6`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    let recommendationsJson = await responseRecommendations.json()

    console.log("Recommendations: \n")
    console.log(recommendationsJson.tracks)

    return recommendationsJson.tracks;
}