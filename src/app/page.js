"use client"

import LoginPage from './login/page'
import SongsPage from './songs/page'
import {useSession} from 'next-auth/react'

export default function Home() {
  const {data: session, status} = useSession();

  return <>
    { status !== "authenticated" && <LoginPage/> }
    { status === "authenticated" && <SongsPage/>} 
  </>
}
