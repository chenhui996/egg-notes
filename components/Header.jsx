import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <Link href={'/'} className='linlk--unstyled'>
      <section className='sidebar-header'>
        <img
          className='logo'
          src='/logo.svg'
          width={22}
          height={20}
          alt=''
          role='presentation'
        />
        <strong>React Notes</strong>
      </section>
    </Link>
  )
}

export default Header
