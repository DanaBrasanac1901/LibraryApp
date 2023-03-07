import { Link } from 'react-router-dom'
import './footer-menu.css'

export function FooterMenu() {
  return (
    <span className='footer'>
      <div>
        <Link to='/'>
          <button className='footer-buttons'>Home</button>
        </Link>
      </div>
      <div>
        <Link to='/profile'>
          <button className='footer-buttons'>Profile</button>
        </Link>
      </div>
    </span>
  )
}
