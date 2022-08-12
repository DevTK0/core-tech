import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import style from '../styles/global.module.css'

const handleSignin = (e: React.SyntheticEvent) => {
  e.preventDefault()
  signIn()
}    

const handleSignout = (e: React.SyntheticEvent) => {
  e.preventDefault()
  signOut()
}

const Home: NextPage = () => {
  
  const { data: session } = useSession();

  return (
    <>
      <main>
            {session && <button onClick={handleSignout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign out</button>  } 
            {!session && <button onClick={handleSignin}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign in</button>  } 
      </main>
    </>
  )
}

export default Home
