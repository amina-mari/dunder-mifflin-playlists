"use client"

import Link from 'next/link'

export default function Home() {
  return (<>
    <h1>Dunder Mifflin Playlists</h1>
    <Link href="/login">Login</Link>
  </>
  );
}
