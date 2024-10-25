import {render, screen, fireEvent} from '@testing-library/react'
import {toBeInTheDocument, getByText} from '@testing-library/jest-dom'
import Footer from '../Footer'

describe("Footer Unit Test", () => {
    beforeEach(() => {
        render(<Footer />)
    })

    it("should render all components with the right texts", () => {
        expect(screen.getByText("Não tem uma conta? Que tristeza!")).toBeInTheDocument();
        expect(screen.getByText("Não tem uma conta? Que tristeza!")).toBeVisible();

        expect(screen.getByText("Termos e Condições")).toBeInTheDocument();
        expect(screen.getByText("Termos e Condições")).toBeVisible();

        expect(screen.getByText("Suporte")).toBeInTheDocument();
        expect(screen.getByText("Suporte")).toBeVisible();

        expect(screen.getByText("Dúvidas")).toBeInTheDocument();
        expect(screen.getByText("Dúvidas")).toBeVisible();
    })

    it("'terms and conditions' link should redirect to the correct pages when clicked", () => {
        const termsLink = screen.getByText("Termos e Condições")

        fireEvent.click(termsLink);

        expect(screen.getByText("Aqui estão nossos Termos e Condições!")).toBeInTheDocument();
    })

    it("'support' link should redirect to the correct pages when clicked", () => {
        const supportLink = screen.getByText("Suporte");

        fireEvent.click(supportLink);

        expect(screen.getByText("Entre em contato com nosso suporte")).toBeInTheDocument();
    })

    it("'doubts' link should redirect to the correct pages when clicked", () => {
        const doubtsLink = screen.getByText("Suporte");

        fireEvent.click(doubtsLink);

        expect(screen.getByText("Perguntas Frequentes")).toBeInTheDocument();
    })
})
