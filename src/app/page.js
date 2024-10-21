"use client"
import styles from './page.module.css'
import LinkComponent from './components/link/link'
import Title from './components/title/title'

export default function Home() {
  return (
  <section className={styles["home"]}>
    <Title>Dunder Mifflin Playlists</Title>
    <LinkComponent href="/login">Login</LinkComponent>
  </section>
  );
}
