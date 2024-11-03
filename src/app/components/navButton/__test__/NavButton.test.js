import {render, screen, fireEvent} from '@testing-library/react';
import {toBeInTheDocument} from '@testing-library/jest-dom';
import NavButton from '../NavButton.js'
import {useState} from 'react'

describe("NavButton Unit Test", () => {

    it("should render all elements of the button", () => {
        render(<NavButton type="search" />)

        const searchTextElement = screen.getByText(/Busca/i);
        const searchIcon = screen.getByTestId(/search-icon/i);

        expect(searchTextElement).toBeInTheDocument();
        expect(searchIcon).toBeInTheDocument(); 
    })

    it("when clicked, should receive 'active' class", () => {
        const setActiveMock = jest.fn(type => {
            rerender(<NavButton type="search" active="search"/>)
        })

        const {rerender} = render(<NavButton type="search" setActive={setActiveMock}/>);

        const searchTextElement = screen.getByText(/Busca/i);
        fireEvent.click(searchTextElement);
        
        expect(searchTextElement.classList).toMatchObject({
            "0": "nav-button",
            "1": "nav-button-active"
        })
    })
})