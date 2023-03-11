import { NavLink } from 'react-router-dom'

import { SideMenuProps } from '../../interfaces/SideMenuProps'
import './sideMenu.css'


export function SideMenu({ isAuthenticated, setShowCreateBookDialog }: SideMenuProps) {
  const showDialog = () =>{
    setShowCreateBookDialog(true)
  }
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
      <div>
        <button className='side-menu-buttons' onClick={showDialog}>Add book</button>
      </div>
    </div>
  )
}
