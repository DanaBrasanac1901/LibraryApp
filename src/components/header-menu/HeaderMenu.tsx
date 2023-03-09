import { Dispatch, ReactNode, SetStateAction } from 'react'

import { Link } from 'react-router-dom'

import './header-menu.css'

interface Props {
  children: ReactNode
  isAuthenticated:boolean,
  setAuthenticated:Dispatch<SetStateAction<boolean>>
}

export function HeaderMenu({ children, isAuthenticated, setAuthenticated }: Props ) {
  const SignOut = () => {
    sessionStorage.clear()
    setAuthenticated(false)
  }
  return (
    <div className='header-menu'>
      {children}
      <div className='header-routing-buttons'>
        {isAuthenticated ?
          <Link to='/'>
            <button className='header-buttons' onClick={() => SignOut()}>Sign Out</button>
          </Link>:
          <Link to='/login' >
            <button className='header-buttons'>Sign in</button>
          </Link>
        }
      </div>
    </div>
  )
}
