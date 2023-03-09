import { Link } from 'react-router-dom'
import './sideMenu.css'


export function SideMenu({ isAuthenticated }: {isAuthenticated : boolean}) {
  return (
    <div className='side-menu'>
      <div>
        <Link to='/'>
          <button className='side-menu-buttons'>Home</button>
        </Link>
      </div>
      { isAuthenticated &&
      <div>
        <Link to='/profile'>
          <button className='side-menu-buttons'>Profile</button>
        </Link>
      </div> }
    </div>
  )
}
