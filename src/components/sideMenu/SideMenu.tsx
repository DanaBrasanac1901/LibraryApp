import { NavLink } from 'react-router-dom'
import './sideMenu.css'


export function SideMenu({ isAuthenticated }: {isAuthenticated : boolean}) {
  return (
    <div className='side-menu'>
      <div>
        <NavLink to='/'>
          <button className='side-menu-buttons'>Home</button>
        </NavLink>
      </div>
      { isAuthenticated &&
      <div>
        <NavLink to='/profile'>
          <button className='side-menu-buttons'>Profile</button>
        </NavLink>
      </div> }
    </div>
  )
}
