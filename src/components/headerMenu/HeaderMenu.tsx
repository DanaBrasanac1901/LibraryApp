import { Dispatch, ReactNode, SetStateAction } from 'react'

import { NavLink } from 'react-router-dom'

import './headerMenu.css'

interface Props {
  children?: ReactNode
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
          <NavLink to='/'>
            <button className='header-buttons' onClick={() => SignOut()}>Sign Out</button>
          </NavLink>:
          <NavLink to='/login' >
            <button className='header-buttons'>Sign in</button>
          </NavLink>
        }
      </div>
    </div>
  )
}
