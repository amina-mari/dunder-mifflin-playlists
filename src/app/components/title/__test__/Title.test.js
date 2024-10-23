import {getByText, render, screen} from '@testing-library/react';
import {toBeInTheDocument} from '@testing-library/jest-dom';
import Title from '../title';


beforeEach(() => {
    render(<Title>My Title</Title>)
})

describe("Title Component Unit Test", () => {
    it("Title component should render the same text that is passed as prop", () => {
        const titleComponent = screen.getByText(/My Title/i)
        expect(titleComponent).toBeInTheDocument();
    })

    it("Title component should be visible for the user", () => {
        const titleComponent = screen.getByText(/My Title/i)
        expect(titleComponent).toBeVisible();
    })
})