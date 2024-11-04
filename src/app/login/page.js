"use client"
import Title from "../components/title/title"
import Input from "../components/input/Input"
import Button from "../components/button/Button"
import OAuthComponent from "../components/oauth/OAuthComponent"
import Footer from "../components/footer/Footer"
import styles from './page.module.scss'

export default function LoginPage() {
    return (
        <main className={styles["main-container"]}>
            <div className={styles["header"]}>
                <Title>Dunder Mifflin Playlists</Title>
                <p>Assim como o escritório mais icônico de Scranton, esta aplicação é um lugar onde as músicas são gerenciadas com a mesma seriedade (ou falta dela) que Michael Scott gerencia sua equipe. Aqui, você pode criar, editar e organizar suas playlists como um verdadeiro Regional Manager... ou Assistant to the Regional Manager.</p>
                <p>Explore nossas funcionalidades enquanto escuta seus hits favoritos, e não se esqueça: &quot;Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love their playlists.&quot; – Michael Scott</p>
            </div>
            <div className={styles["login-form"]}>
                <Title level={2}>Login</Title>
                <span>Entre com sua conta</span>
                <form action="">
                    <Input type="email"/>
                    <Input type="password"/>
                    <Button type="submit">Login</Button>
                    <div>
                        <span className={styles["span-or"]}>Ou</span>
                    </div>
                    <OAuthComponent/>
                </form>
                <Footer />
            </div>
        </main>
    )
}