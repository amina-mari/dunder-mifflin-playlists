import {fireEvent, render, screen} from '@testing-library/react'
import CardRecommendations from '../CardRecommendations'
import testIcon from './test-icon.svg'
import {toBeInTheDocument} from '@testing-library/jest-dom'

describe("Card Component Unit Test", () => {

    const mockedOnClick = jest.fn(() => true);

    it("Should render with different inputs", () => {
        render(<CardRecommendations 
                    imgSrc={testIcon.src} 
                    title="Adele" 
                    description="artist" />)
        render(<CardRecommendations 
                    imgSrc={testIcon.src} 
                    title="John Mayer" 
                    description="artist" />)

        expect(screen.getByText("Adele")).toBeInTheDocument();
        expect(screen.getByText("John Mayer")).toBeInTheDocument();
    })

    it("Should activate onClick function that is passed to it", () => {
        render(<CardRecommendations 
            imgSrc={testIcon.src} 
            title="Adele" 
            description="artist"
            id={123} 
            onClick={mockedOnClick}/>)
        render(<CardRecommendations 
            imgSrc={testIcon.src} 
            title="John Mayer" 
            description="artist"
            id={321} 
            onClick={mockedOnClick}/>)

        const adeleCardTitle = screen.getByText("Adele");
        const johnMayerCardTitle = screen.getByText("John Mayer");
        
        fireEvent.click(adeleCardTitle);
        fireEvent.click(johnMayerCardTitle);

        expect(mockedOnClick).toHaveBeenCalledTimes(2);
        expect(mockedOnClick.mock.calls[0][0]).toBe(123);
        expect(mockedOnClick.mock.calls[1][0]).toBe(321);
    })
})