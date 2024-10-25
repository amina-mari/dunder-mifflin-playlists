import Link from "next/link";

export default function Footer () {
    return (
        <footer>
            <div>
                <p>Não tem uma conta? Que tristeza!</p>
            </div>
            <div>
                <Link href="terms-and-conditions">Termos e Condições</Link>
                <Link href="support">Suporte</Link>
                <Link href="faq">Dúvidas</Link>
            </div>
        </footer>
    )
}
