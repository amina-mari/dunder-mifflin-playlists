import {fireEvent, screen, render} from '@testing-library/react'
import Input from '../Input'

describe("Input Component Unit Test", () => {
    describe("Email Input tests", () => {
        beforeEach(() => {
            render(<Input type="email" />)
        })

        it("should render in the screen", () => {
            const inputElement = screen.getByTestId("inputEmail");
            expect(inputElement).toBeInTheDocument();
            expect(inputElement).toBeVisible();
        })

        it("should not have invalid class when given a valid email", () => {
            const inputElement = screen.getByTestId("inputEmail");
            fireEvent.change(inputElement, {
                target: {value: "email@email.com"}
            })
            expect(inputElement.classList).toMatchObject({
                "0": "input",
                "1": "input-email"
            })
        })

        it("should have invalid class when given an invalid email", () => {
            const inputElement = screen.getByTestId("inputEmail");
            fireEvent.change(inputElement, {
                target: {value: "invalidEmail"}
            })
            expect(inputElement.classList).toMatchObject({
                "0": "input",
                "1": "input-email",
                "2": "input-email_invalid"
            })
        })
    })

    describe("Password Input tests", () => {
        beforeEach(() => {
            render(<Input type="password" />)
        })

        it("should render in the screen", () => {
            const inputElement = screen.getByTestId("inputPassword");
            expect(inputElement).toBeInTheDocument();
            expect(inputElement).toBeVisible();
        })

        it("should have passwordInput classes", () => {
            const inputElement = screen.getByTestId("inputEmail");
            
            expect(inputElement.classList).toMatchObject({
                "0": "input",
                "1": "input-password"
            })
        })
    })

})