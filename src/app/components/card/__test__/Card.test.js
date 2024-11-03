import {fireEvent, render, screen} from '@testing-library/react'
import Card from '../Card';
import testIcon from './test-icon.svg'
import {toBeInTheDocument} from '@testing-library/jest-dom'

describe("Card Component Unit Test", () => {

    const mockedOnClick = jest.fn(() => true);

    it("Should render with different inputs", () => {
        render(<Card 
                    imgSrc={testIcon.src} 
                    title="Adele" 
                    description="artist" />)
        render(<Card 
                    imgSrc={testIcon.src} 
                    title="John Mayer" 
                    description="artist" />)

        expect(screen.getByText("Adele")).toBeInTheDocument();
        expect(screen.getByText("John Mayer")).toBeInTheDocument();
    })

    it("Should activate onClick function that is passed to it", () => {
        render(<Card 
            imgSrc={testIcon.src} 
            title="Adele" 
            description="artist" 
            onClick={mockedOnClick}/>)
        render(<Card 
            imgSrc={testIcon.src} 
            title="John Mayer" 
            description="artist" 
            onClick={mockedOnClick}/>)

        const adeleCardTitle = screen.getByText("Adele");
        const johnMayerCardTitle = screen.getByText("Adele");
        
        fireEvent.click(adeleCardTitle);
        fireEvent.click(johnMayerCardTitle);

        expect(mockedOnClick).toHaveBeenCalledTimes(2);
    })
})