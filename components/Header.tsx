import Image from 'next/image'
import Link from 'next/link'

const Header = ({children}: HeaderProps) => {
  return (
    <div className='header'>
        <Link href='/' className='md:flex-1'>
            <Image src="/assets/icons/logo.svg" width={120} height={32} className='hidden md:block' alt='logo with name' />
            <Image src="/assets/icons/logo-icon.svg" width={32} height={32} className='mr-2 md:hidden' alt='logo' />
        </Link>
        {children}
    </div>
  )
}

export default Header