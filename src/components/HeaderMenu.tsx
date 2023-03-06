import { ReactNode } from 'react'

import { Link } from 'react-router-dom'

import '../styles/HeaderMenu.css'

interface Props {
  children: ReactNode
}

export function HeaderMenu({ children }: Props) {
  return (
    <div className='header-menu'>
      {children}
      <div className='header-routing-buttons'>
        <Link to='/login'>
          <button className='header-buttons'>Sign in</button>
        </Link>
        <Link to='/registration'>
          <button className='header-buttons'>Sign Up</button>
        </Link>
      </div>
    </div>
  )
}
