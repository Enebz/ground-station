import { useState } from 'react'

import Logo from '../assets/logo_white.png'
import { FaCode, FaMoon, FaSun, FaTerminal } from 'react-icons/fa'
import { LuLayoutDashboard } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

// Header Interface
interface HeaderProps {

}

// Header Function: The header for the website.
const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);

  const goHome = () => {
    navigate('/');
  }

  const popoutTerminal = () => {
    window.open('/cli', 'Terminal', 'width=800,height=600')
  }

  const openDashboard = () => {
    navigate('/dashboard');
  }

  const openDev = () => {
    navigate('/dev');
  }

  const toggleTheme = () => {
    setDark(d => !d)  
    document.body.classList.toggle("dark")
  }

  return (
    <div className='flex flex-row items-center justify-between p-4 h-header bg-primary-500'>
      <div onClick={goHome} className='flex flex-row items-center h-12 cursor-pointer'>
        <img className='h-full' src={Logo} />
      </div>
      <div className='flex flex-row'>
        <div className='flex flex-row items-center'>
          <button onClick={popoutTerminal} className='p-4 h-min rounded-full text-white'>
            <FaTerminal />
          </button>
          <button onClick={openDashboard} className='p-4 h-min rounded-full text-white'>
            <LuLayoutDashboard />
          </button>
          <button onClick={openDev} className='p-4 h-min rounded-full text-white'>
            <FaCode />
          </button>
          <button onClick={toggleTheme} className='p-4 h-min rounded-full text-white'>
            {
              dark ? <FaSun /> : <FaMoon />
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header