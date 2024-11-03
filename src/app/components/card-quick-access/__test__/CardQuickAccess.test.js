import {fireEvent, render, screen} from '@testing-library/react'
import CardQuickAccess from '../CardQuickAccess'
import testIcon from './test-icon.svg'
import {toBeInTheDocument} from '@testing-library/jest-dom'

describe("Card Component Unit Test", () => {

    it("Should render with different inputs", () => {
        render(<CardQuickAccess 
                    imgSrc={testIcon.src} 
                    title="Adele" 
                    description="artist" />)
        render(<CardQuickAccess 
                    imgSrc={testIcon.src} 
                    title="John Mayer" 
                    description="artist" />)

        expect(screen.getByText("Adele")).toBeInTheDocument();
        expect(screen.getByText("John Mayer")).toBeInTheDocument();
    })

    it("Should activate onClick function that is passed to it", () => {
        const mockedOnClick = jest.fn((id) => {
            if(id === 123) {
                rerenderAdeleCard(<CardQuickAccess 
                    imgSrc={testIcon.src} 
                    title="Adele" 
                    description="artist" 
                    id={123}
                    onClick={mockedOnClick}
                    active={true}/>
                    )
            }
            else if(id === 321) {
                rerenderJohnMayerCard(<CardQuickAccess 
                    imgSrc={testIcon.src} 
                    title="John Mayer" 
                    description="artist"
                    id={321} 
                    onClick={mockedOnClick}
                    active={true}/>)
            }
        });
        
        const {rerender: rerenderAdeleCard} = render(<CardQuickAccess 
            imgSrc={testIcon.src} 
            title="Adele" 
            description="artist" 
            id={123}
            onClick={mockedOnClick}/>)
        const {rerender: rerenderJohnMayerCard} = render(<CardQuickAccess 
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

        const divAdele = screen.getByTestId(123);
        const divJohnMayer = screen.getByTestId(321);

        expect(divAdele.classList).toMatchObject({
            "0": "card-quick-access",
            "1": "card-quick-access-active"
        })

        expect(divJohnMayer.classList).toMatchObject({
            "0": "card-quick-access",
            "1": "card-quick-access-active"
        })
    })
})