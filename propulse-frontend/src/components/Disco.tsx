import Button from './Button';
import classNames from 'classnames';
import { FaLightbulb } from 'react-icons/fa';
import { sendCommand } from '../api/cli';

interface DiscoProps {
  name?: string;
  inline?: boolean;
}

const Disco: React.FC<DiscoProps> = ({name}) => {
  const buttonStyles: {
    [key: string]: boolean;
  } = {
    "w-full flex-1": true,
    "btn-primary": true,
  }

  const sendDisco = () => {
    sendCommand('sys disco');
  }

  return (
    <div className='flex flex-col px-4 pb-4 pt-2 rounded-md dark:bg-stone-800 bg-slate-200 h-full w-full'>
      <div className='flex flex-row items-center space-x-2'>
        <FaLightbulb className='w-4 h-4 dark:fill-white fill-black' />
        <span className='text-lg font-black'>{name}</span>
      </div>
      <Button onClick={sendDisco} className={classNames(buttonStyles)}>
        Disco
      </Button>
    </div>
  )
}

export default Disco;