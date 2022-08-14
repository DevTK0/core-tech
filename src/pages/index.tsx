import type { NextPage } from 'next'
import Header  from '../components/Header';
import SimpleTable  from '../components/SimpleTable';

const Home: NextPage = () => {

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
