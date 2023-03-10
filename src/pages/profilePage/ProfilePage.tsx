import { NavLink } from 'react-router-dom'

import { ProfilePageProps } from '../../interfaces/ProfilePageProps'
import { clearSessionStorage } from '../../services/SessionStorageService'
import './profilePage.css'

export function ProfilePage({ setIsAuthenticated }: ProfilePageProps) {
  const logOut = () => {
    clearSessionStorage()
    setIsAuthenticated(false)
  }
  return(
    <div className='profile-page'>
      <NavLink to='/'>
        <button className='log-out-button' onClick={logOut}>Log out</button>
      </NavLink>
    </div>
  )
}
