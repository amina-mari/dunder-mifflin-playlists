import {fireEvent, render, screen} from '@testing-library/react';
import BackForthButton from '../BackForthButton';
import {toBeInTheDocument} from '@testing-library/jest-dom'

describe("BackForthButton Component Unit Test", () => {
    const mockOnClick = jest.fn((type) => {});

    beforeEach(() => {
        render(<BackForthButton 
                    type="back"
                    onClick={mockOnClick} />)
    })
    it("should render in the screen", () => {
        const buttonElement = screen.getByTestId("backButton");

        expect(buttonElement).toBeInTheDocument();
    })

    it("should call onClick function when a click event is fired", () => {
        const buttonElement = screen.getByTestId("backButton");
        fireEvent.click(buttonElement);

        expect(mockOnClick).toHaveBeenCalled();
        expect(mockOnClick.mock.calls[0][0]).toBe("back");
    })
})