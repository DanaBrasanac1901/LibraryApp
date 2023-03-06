import { Link } from 'react-router-dom'
import '../styles/FooterMenu.css'

export function FooterMenu() {
  return (
    <div className='footer'>
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
    </div>
  )
}
