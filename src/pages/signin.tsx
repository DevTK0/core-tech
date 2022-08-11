import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'

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
            {session && <a href="#" onClick={handleSignout} className="btn-signin">Sign out</a>  } 
            {!session && <a href="#" onClick={handleSignin}  className="btn-signin">Sign in</a>  } 
      </main>
    </>
  )
}

export default Home
