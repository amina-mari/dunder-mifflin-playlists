import Link from "next/link";
import styles from './Footer.module.scss'

export default function Footer () {
    return (
        <footer className={styles["footer"]}>
            <div>
                <p>Não tem uma conta? Que tristeza!</p>
            </div>
            <div className={styles["links"]}>
                <Link className={styles["footer-link"]} href="terms-and-conditions">Termos e Condições</Link>
                <Link className={styles["footer-link"]} href="support">Suporte</Link>
                <Link className={styles["footer-link"]} href="faq">Dúvidas</Link>
            </div>
        </footer>
    )
}
