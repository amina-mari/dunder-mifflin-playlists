import {fireEvent, render, screen} from '@testing-library/react'
import {toBeInTheDocument} from '@testing-library/jest-dom'
import Button from '../Button'

describe("Button component Unit Test", () => {
    beforeEach(()=> {
        render(<Button>Login</Button>)
    })
    it("should render on the screen", () => {
        const buttonElement = screen.getByText("Login", {selector: "button"})
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toBeVisible();
    })

    it("should appear loading icon and be disabled when clicked", () => {
        const buttonElement = screen.getByText("Login", {selector: "button"})
        fireEvent.click(buttonElement);

        expect(buttonElement.disabled).toBe(true);
        expect(buttonElement.textContent).not.toBe("Login");
    })
})