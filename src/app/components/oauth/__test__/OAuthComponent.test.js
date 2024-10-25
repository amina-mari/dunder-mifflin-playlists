import {fireEvent, render, screen} from '@testing-library/react'
import {toBeInTheDocument} from "@testing-library/jest-dom";
import OAuthComponent from '../OAuthComponent'

describe("OAuthComponent Unit Tests", () => {
    beforeEach(() => {render(<OAuthComponent />)})
    it("OAuth should be visible on the page", () => {
        const oAuthComponent = screen.getByTestId("oAuth");

        expect(oAuthComponent).toBeInTheDocument()
        expect(oAuthComponent).toBeVisible()
    })
    
    it("should redirect to Spotify Authorization page", async () => {
        const oAuthComponent = screen.getByTestId("oAuth");

        fireEvent.click(oAuthComponent);

        const spotifyAuthPageTitle = await screen.findByText(/You agree that Dunder Mifflin Playlists will be able to:/i)
        
        expect(spotifyAuthPageTitle).toBeInTheDocument();
    })
})