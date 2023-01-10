import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice' 
import {TbBugOff} from 'react-icons/tb'

const Navbar = () => {
 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user} = useSelector(state => state.auth)

  const onLogout = () => {
    dispatch(logout()) 
    dispatch(reset)
    navigate('/')
  }

  return (
    <header className='bg-[#003049]'>
        <nav className='container mx-auto md:container md:mx-auto px-4 py-2 flex justify-between'>
        <Link to='/'>
          <TbBugOff className='bg-slate-50 text-4xl text-[#003049] rounded-full' />
        </Link>
          <ul className='flex justify-start items-center list-none gap-2 text-light mt-2 text-slate-50'>
            {user ? (
              <>
               <li><Link className='font-medium mr-2 hover:text-gray-900' to='/dashboard'>Dashboard</Link></li>
                <button className="flex gap-2 items-center" onClick={() => onLogout()}><FaSignOutAlt/> Logout</button>
              </>
            ): (
             <>
               <li><Link className='font-medium' to='/login'><FaSignInAlt/>Login</Link></li>
              <li><Link className='font-medium' to='/register'>Register</Link></li>
             </>
            )}
          </ul>
        </nav>
    </header>
  )
}

export default Navbar