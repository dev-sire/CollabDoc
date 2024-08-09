import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Header = ({children, className}: HeaderProps) => {
  return (
    <div className={cn('header', className)}>
        <Link href='/' className='md:flex-1'>
            <Image src="/assets/icons/logofinal.svg" width={150} height={40} className='hidden md:block' alt='logo with name' />
            <Image src="/assets/icons/logo-icon.svg" width={32} height={32} className='mr-2 md:hidden' alt='logo' />
        </Link>
        {children}
    </div>
  )
}

export default Header