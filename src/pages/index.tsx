import type { NextPage } from 'next'
import { useSession, signIn, signOut } from 'next-auth/react'
import Header  from '../components/Header';
import SimpleTable  from '../components/SimpleTable';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Header />
        <main>
            <SimpleTable />
        </main>
    </div>
  )
}

export default Home
