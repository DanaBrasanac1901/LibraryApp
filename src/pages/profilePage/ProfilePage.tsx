import { Dispatch, SetStateAction } from 'react'

import { NavLink } from 'react-router-dom'
import './profilePage.css'

export function ProfilePage({ setAuthenticated }:{setAuthenticated:Dispatch<SetStateAction<boolean>>}) {
  const LogOut = () => {
    sessionStorage.clear()
    setAuthenticated(false)
  }
  return(
    <div className='profile-page'>
      <NavLink to='/'>
        <button className='log-out-button' onClick={LogOut}>Log out</button>
      </NavLink>
    </div>
  )
}
