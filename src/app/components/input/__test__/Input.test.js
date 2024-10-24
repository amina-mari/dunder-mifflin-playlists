import {fireEvent, screen, render} from '@testing-library/react'
import {toBeInTheDocument} from '@testing-library/jest-dom'
import Input from '../Input'

describe("Input Component Unit Test", () => {
    describe("Email Input tests", () => {
        beforeEach(() => {
            render(<Input type="email" />)
        })

        it("should render in the screen", () => {
            const inputElement = screen.getByTestId("input-email");
            expect(inputElement).toBeInTheDocument();
            expect(inputElement).toBeVisible();
        })

        it("should not have invalid class when given a valid email", () => {
            const inputElement = screen.getByTestId("input-email");
            fireEvent.change(inputElement, {
                target: {value: "email@email.com"}
            })
            expect(inputElement.classList).toMatchObject({
                "0": "input",
                "1": "input-email"
            })
        })

        it("should have invalid class when given an invalid email", () => {
            const inputElement = screen.getByTestId("input-email");
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
            const inputElement = screen.getByTestId("input-password");
            expect(inputElement).toBeInTheDocument();
            expect(inputElement).toBeVisible();
        })

        it("should have passwordInput classes", () => {
            const inputElement = screen.getByTestId("input-password");
            
            expect(inputElement.classList).toMatchObject({
                "0": "input",
                "1": "input-password"
            })
        })

        it("should have invalid passwordInput classes when the value is missing", () => {
            const inputElement = screen.getByTestId("input-password");
            fireEvent.change(inputElement, {target: {value: "passwordTyped"}})
            fireEvent.change(inputElement, {target: {value: ""}})

            expect(inputElement.classList).toMatchObject({
                "0": "input",
                "1": "input-password",
                "2": "input-password_invalid"
            })
        })
    })

})