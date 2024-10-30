import {render, screen, fireEvent} from '@testing-library/react';
import {toBeInTheDocument} from '@testing-library/jest-dom';
import NavButton from '../NavButton.js'

describe("NavButton Unit Test", () => {
    beforeEach(() => {
        render(<NavButton type="search" />)
    })

    it("should render all elements of the button", () => {
        const searchTextElement = screen.getByText(/Busca/i);
        const searchIcon = screen.getByTestId(/search-icon/i);

        expect(searchTextElement).toBeInTheDocument();
        expect(searchIcon).toBeInTheDocument(); 
    })

    it("when clicked, should receive 'active' class", () => {
        const searchTextElement = screen.getByText(/Busca/i);
        fireEvent.click(searchTextElement);

        expect(searchTextElement.classList).toMatchObject({
            "0": "nav-button",
            "1": "nav-button-active"
        })
    })
})