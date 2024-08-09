import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'

const Home = () => {

  const documents = []

  return (
    <main className='home-container'>
      <Header className='sticky left-0 top-0'>
        <div className="flex items-center gap-2 lg:gap-4">
          Notifications
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {documents.length > 0 ? (
        <div></div>
      ): (
        <div className='document-list-empty'>
          <Image 
            src="/assets/icons/doc.svg"
            alt='document'
            width={40}
            height={40}
            className='mx-auto'
          />    
        </div>
      )}
    </main>
  )
}

export default Home