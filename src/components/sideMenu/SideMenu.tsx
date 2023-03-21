import { NavLink } from 'react-router-dom'

import { SideMenuProps } from '../../interfaces/SideMenuProps'
import './sideMenu.css'


export function SideMenu({ isAuthenticated }: SideMenuProps) {
  return (
    <div className='side-menu'>
      <div>
        <NavLink to='/'>
          <button className='side-menu-buttons'>Home</button>
        </NavLink>
      </div>
    </div>
  )
}
