import {render, screen} from '@testing-library/react';
import {toBeInTheDocument} from '@testing-library/jest-dom'
import NavigationDots from '../navigationDots';


describe("NavigationDots Component Unit Tests", () => {
    it("The two dots are small when activeDot property is setted to 'none'", () => {
        render(<NavigationDots activeDot='none' />)
        const loginDotElement = screen.getByTestId("loginDot")
        const songsDotElement = screen.getByTestId("songsDot")

        expect(loginDotElement.classList).toMatchObject({
            "0": "nav-dot",
            "1": "nav-dot_login"
        })

        expect(songsDotElement.classList).toMatchObject({
            "0": "nav-dot",
            "1": "nav-dot_songs"
        })
    })

    it("Only login dot receive activeDot class when activeDot prop is setted to 'login'", () => {
        render(<NavigationDots activeDot='login' />)

        const loginDotElement = screen.getByTestId("loginDot");
        const songsDotElement = screen.getByTestId("songsDot")

        expect(loginDotElement.classList).toMatchObject({
            "0": "nav-dot",
            "1": "nav-dot_login",
            "2": "active-dot"
        })

        expect(songsDotElement.classList).toMatchObject({
            "0": "nav-dot",
            "1": "nav-dot_songs"
        })
    })

    it("Only songs dot receive activeDot class when activeDot prop is setted to 'songs'", () => {
        render(<NavigationDots activeDot='songs' />)

        const loginDotElement = screen.getByTestId("loginDot");
        const songsDotElement = screen.getByTestId("songsDot")

        expect(loginDotElement.classList).toMatchObject({
            "0": "nav-dot",
            "1": "nav-dot_login"
        })

        expect(songsDotElement.classList).toMatchObject({
            "0": "nav-dot",
            "1": "nav-dot_songs",
            "2": "active-dot"
        })
    })
})