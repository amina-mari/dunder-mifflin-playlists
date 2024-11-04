import {render, screen} from '@testing-library/react'
import SongsPage from '../page'
import fetchArtists from '@/utils/fetchArtists/fetchArtists'
import fetchLatestTracks from '@/utils/fetchLatestTracks/fetchLatestTracks'
import fetchRecommendations from '@/utils/fetchRecommendations/fetchRecommendations'


jest.mock(fetchArtists);
fetchArtists.mockImplementation(() => Promise.resolve({}))
describe("Songs Page Integration Test", () => {
    
})
