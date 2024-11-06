import {fireEvent, render, screen} from '@testing-library/react'
import Navbar from '../Navbar'
import {toBeInTheDocument} from '@testing-library/jest-dom';
import testIcon from './test-icon.svg'

describe("Navbar Unit/Integration tests", () => {

    const mockCardOnClick = jest.fn(idCard => idCard)

    it("should render correctly when cards argument is empty", () => {
        render(<Navbar />)

        const navbarElement = screen.getByRole("navigation")

        expect(navbarElement).toBeInTheDocument()
        expect(navbarElement.childNodes.length).toBe(4);
    })

    it("should render correctly and activate the onClick functions using the respective id's of the cards when different cards is passed as arguments", () => {
        render(<Navbar 
            cards={[
            {
                name: "Testing Card 1",
                type: "track",
                id: 1,
                images: [
                    {url: testIcon.src},
                    "",
                    ""
                ]
            },
            {
                name: "Testing Card 2",
                type: "track",
                id: 2,
                images: [
                    {url: testIcon.src},
                    "",
                    ""
                ]
                
            }]}
            cardOnClick={mockCardOnClick}/>)

            const testCard1 = screen.getByText("Testing Card 1");
            const testCard2 = screen.getByText("Testing Card 2");

            expect(testCard1).toBeInTheDocument();
            expect(testCard2).toBeInTheDocument();

            fireEvent.click(testCard1);
            fireEvent.click(testCard2);

            expect(mockCardOnClick).toHaveBeenCalledTimes(2);
            expect(mockCardOnClick.mock.calls[0][0]).toBe(1)
            expect(mockCardOnClick.mock.calls[1][0]).toBe(2);
    })
})