import {fireEvent, render, screen} from '@testing-library/react';
import {toBeInTheDocument} from '@testing-library/jest-dom';
import LinkComponent from '../link';

beforeEach(() => {
    render(<LinkComponent href="#">Click Here!</LinkComponent>)
})

describe("LinkComponent Unit Test", () => {
    test('should render the Link with the right text', () => {
        const linkElement = screen.getByText(/Click Here!/i)
        expect(linkElement).toBeInTheDocument()
    })

    test('Link should be visible for the user', () => {
        const linkElement = screen.getByText(/Click Here!/i)
        expect(linkElement).toBeVisible()
    })

    test('when clicked, link component should redirect to the correct page', () => {
        const linkElement = screen.getByText(/Click Here!/i)
        fireEvent.click(linkElement);
        expect(linkElement).toBeInTheDocument();
    })
})
