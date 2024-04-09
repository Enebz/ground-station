import Rocket from '../components/Rocket';
import { useModal } from '../context/modal/ModalHook';
import Logo from '../assets/logo.png'

// Home Function: This is the homepage, should be located at (/).
const Stream: React.FC = () => {
  const modal = useModal();
  
  return (
    <div className='relative text-xl text-red-500 h-screen'>
      <div className='absolute top-4 left-4 h-24'>
        <img src={Logo} className='h-full'/>
      </div>
      <div className='absolute bottom-0 right-0 h-64 bg-stone-900/70'>
        <Rocket />
      </div>
    </div>
  )
}

export default Stream
