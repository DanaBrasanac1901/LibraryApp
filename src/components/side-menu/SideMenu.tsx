import { Link } from 'react-router-dom'
import './side-menu.css'

export function SideMenu() {
  return (
    <div className='side-menu'>
      <div>
        <Link to='/'>
          <button className='side-menu-buttons'>Home</button>
        </Link>
      </div>
      <div>
        <Link to='/profile'>
          <button className='side-menu-buttons'>Profile</button>
        </Link>
      </div>
    </div>
  )
}
