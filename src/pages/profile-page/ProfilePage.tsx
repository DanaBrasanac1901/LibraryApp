import { Link } from 'react-router-dom'

import './profile-page.css'

export function ProfilePage() {
  const LogOut = () => sessionStorage.clear()
  return(
    <div className='profile-page'>
      <Link to='/home'>
        <button className='log-out-button' onClick={() => LogOut()}>Log out</button>
      </Link>
    </div>
  )
}
