import { useDispatch, useSelector } from 'react-redux'
import logo from '../../assets/img/argentBankLogo.png'
import { Link, useNavigate } from 'react-router-dom'

import { authSlice } from '../../features/login/authSlice'

export const NavBar = () => {
  const { token } = useSelector((state) => state.auth)
  const { firstName } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(authSlice.actions.logout())
    navigate('/')
  }

  return (
    <nav className='main-nav'>
      {/* <Link to='/' className='main-nav-loo'> */}
      <a href='/' className='main-nav-loo'>
        <img
          className='main-nav-logo-image'
          src={logo}
          alt='Argent Bank Logo'
        />
        <h1 className='sr-only'>Argent Bank</h1>
      </a>
      {/* </Link> */}
      {!token ? (
        <div>
          <Link to='/login' className='main-nav-item'>
            Sign In
          </Link>
        </div>
      ) : (
        <div>
          <Link to='/profile' className='main-nav-item'>
            <i className='fa fa-user-circle'></i>
            {firstName}
          </Link>
          <Link
            to='/'
            className='main-nav-item'
            onClick={(e) => handleLogout(e)}
          >
            <i className='fa fa-sign-out'></i>
            Sign Out
          </Link>
        </div>
      )}
    </nav>
  )
}
