import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {toBeInTheDocument} from '@testing-library/jest-dom';
import LinkComponent from '../link';
import { useRouter } from 'next/router';


describe("LinkComponent Unit Test", () => {
    const mockPush = jest.fn(() => Promise.resolve(true));

    beforeEach(() => {
        render(<LinkComponent href="/login">Click Here!</LinkComponent>)
    })

    test('should render the Link with the right text', () => {
        const linkElement = screen.getByText(/Click Here!/i)
        expect(linkElement).toBeInTheDocument()
    })

    test('Link should be visible for the user', () => {
        const linkElement = screen.getByText(/Click Here!/i)
        expect(linkElement).toBeVisible()
    })

    test('when clicked, link component should redirect to the correct page', async () => {
        const linkElement = screen.getByText(/Click Here!/i)
        fireEvent.click(linkElement);

        expect(linkElement.getAttribute("href")).toBe("/login")
    })
})
