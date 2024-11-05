import {render, screen} from '@testing-library/react'
import SongsPage from '../page'
import Home from '../../page'
import fetchArtists from '@/utils/fetchArtists/fetchArtists'
import fetchLatestTracks from '@/utils/fetchLatestTracks/fetchLatestTracks'
import fetchRecommendations from '@/utils/fetchRecommendations/fetchRecommendations'
import testIcon from '../../../public/icons/test-icon.svg'
import { SessionProvider } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import {toBeInTheDocument} from '@testing-library/jest-dom'


jest.mock('../../../utils/fetchArtists/fetchArtists', () => ({
    ...jest.requireActual('../../../utils/fetchArtists/fetchArtists'),
    __esModule: true,
    default: jest.fn((token) => Promise.resolve([
        {
            name: "Testing Artist 1",
            type: "artist",
            id: 1,
            images: [
                "",
                "",
                {url: testIcon.src}
            ] 
        },
        {
            name: "Testing Artist 2",
            type: "artist",
            id: 2,
            images: [
                "",
                "",
                {url: testIcon.src}
            ] 
        },
        {
            name: "Testing Artist 3",
            type: "artist",
            id: 3,
            images: [
                "",
                "",
                {url: testIcon.src}
            ] 
        },
        {
            name: "Testing Artist 4",
            type: "artist",
            id: 4,
            images: [
                "",
                "",
                {url: testIcon.src}
            ] 
        },
        {
            name: "Testing Artist 5",
            type: "artist",
            id: 5,
            images: [
                "",
                "",
                {url: testIcon.src}
            ] 
        }
    ]))
}))

jest.mock('next-auth/react', {
    useSession: jest.fn(() => {
        const mockSession = {
            token: {
                access_token: 123 
            },
            expires: new Date(Date.now() + 2 * 86400).toISOString()
          };

        return [mockSession, 'authenticated']
    })
});
describe("Songs Page Integration Test (without real authentication and fetchs)", () => {
    it("should use fetchArtists function", async () => {
        render(<SongsPage />)

        expect(screen.getByText("Testing Artist 1")).toBeInTheDocument()
    })
})
