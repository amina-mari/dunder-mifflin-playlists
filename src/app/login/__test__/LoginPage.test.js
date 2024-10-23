import {render, screen} from '@testing-library/react'
import {toBeInTheDocument} from "@testing-library/jest-dom"
import LoginPage from '../page'

beforeEach(() => {
    render(<LoginPage />)
})

describe("Login Page Integration Test", () => {
    it("All initial elements should be on the screen and visible for the user", () => {
        const mainTitle = screen.getByText("Dunder Mifflin Playlists")
        const subtitle = screen.getByText(/Assim como o escritório mais icônico/i)

        const loginTitle = screen.getByText("Login", {selector: "h2"})
        const loginSubtitle = screen.getByText("Entre com sua conta")
        const loginEmail = screen.getAllByPlaceholderText("email")
        const loginPassword = screen.getAllByPlaceholderText("senha")
        const loginButton = screen.getByText("Login", {selector: "button"})

        const oAuthIcon = screen.getByTestId("oauth-icon")

        const footerText = screen.getByText("Não tem uma conta? Que tristeza!")
        const termsAndConditionsFooter = screen.getByText("Termos e Condições")
        const supportFooter = screen.getByText("Suporte")
        const doubtsFooter = screen.getByText("Dúvidas")

        expect(mainTitle).toBeInTheDocument();
        expect(mainTitle).toBeVisible();

        expect(subtitle).toBeInTheDocument();
        expect(subtitle).toBeVisible();

        expect(loginTitle).toBeInTheDocument();
        expect(loginTitle).toBeVisible();

        expect(loginSubtitle).toBeInTheDocument();
        expect(loginSubtitle).toBeVisible();

        expect(loginEmail).toBeInTheDocument();
        expect(loginEmail).toBeVisible();

        expect(loginPassword).toBeInTheDocument();
        expect(loginPassword).toBeVisible();

        expect(loginButton).toBeInTheDocument();
        expect(loginButton).toBeVisible();

        expect(oAuthIcon).toBeInTheDocument();
        expect(oAuthIcon).toBeVisible();

        expect(footerText).toBeInTheDocument();
        expect(footerText).toBeVisible();

        expect(termsAndConditionsFooter).toBeInTheDocument();
        expect(termsAndConditionsFooter).toBeVisible();

        expect(supportFooter).toBeInTheDocument();
        expect(supportFooter).toBeVisible();

        expect(doubtsFooter).toBeInTheDocument();
        expect(doubtsFooter).toBeVisible();
    })
})