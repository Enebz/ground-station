import { useState } from 'react';
import Button from '../components/Button';
import classNames from 'classnames';


interface SolenoidIconProps {
  className?: string;
}

const SolenoidIcon: React.FC<SolenoidIconProps> = ({className}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 1024 1024">
      <path d="M937.94 287.1a44.84 44.84 0 0 0-44.84 0L512 507.12 130.9 287.1a44.84 44.84 0 0 0-44.84 0c-13.88 8-22.42 22.81-22.42 38.83v465.96c0 16.03 8.54 30.82 22.42 38.84 6.94 4.01 14.67 6 22.42 6s15.48-1.99 22.42-6L512 610.68l381.1 220.03c6.94 4.01 14.67 6 22.42 6s15.48-1.99 22.42-6a44.826 44.826 0 0 0 22.42-38.84V325.93c-.01-16.02-8.54-30.83-22.42-38.83zM153.32 714.23V403.58L422.33 558.9 153.32 714.23zm717.36 0L601.67 558.9l269.01-155.33v310.66z"/>
      <path d="M362.76 276.95h104.4v90c0 24.76 20.08 44.84 44.84 44.84 24.76 0 44.84-20.08 44.84-44.84v-90h104.43c24.76 0 44.84-20.08 44.84-44.84 0-24.76-20.08-44.84-44.84-44.84h-298.5c-24.76 0-44.84 20.08-44.84 44.84-.01 24.77 20.07 44.84 44.83 44.84z"/>
    </svg>
  )
}

interface SolenoidProps {
  name?: string;
  inline?: boolean;
}

const Solenoid: React.FC<SolenoidProps> = ({name, inline}) => {
  const [toggled, setToggled] = useState(false);

  const buttonStyles: {
    [key: string]: boolean;
  } = {
    "w-full flex-1": true,
  }

  if (inline) {
    buttonStyles["bg-green-500 text-xs p-1 w-8"] = toggled;
    buttonStyles["bg-red-500 text-xs p-1 w-8"] = !toggled;
  } else {
    buttonStyles["btn-green active:btn-green-active"] = toggled;
    buttonStyles["btn-red active:btn-red-active"] = !toggled;
  }

  const toggleSolenoid = () => {
    setToggled(toggled => !toggled);
  }

  if (inline) {
    return (
      <div className='flex flex-row items-center px-2 pb-1 pt-1 rounded-md dark:bg-stone-800 bg-slate-200 h-full w-full'>
        <div className='flex flex-row items-center space-x-2 w-56'>
          <SolenoidIcon className='w-4 h-4 dark:fill-white fill-black' />
          <span className='text-xs font-black'>{name}</span>
        </div>
        <Button onClick={toggleSolenoid} className={classNames(buttonStyles)}>
          {
            toggled ? "On" : "Off"
          }
        </Button>
        <span className='text-xs'>⚡0.23A</span>
      </div>
    )
  } else {
    return (
      <div className='flex flex-col px-4 pb-4 pt-2 rounded-md dark:bg-stone-800 bg-slate-200 h-full w-full'>
        <div className='flex flex-row items-center space-x-2'>
          <SolenoidIcon className='w-4 h-4 dark:fill-white fill-black' />
          <span className='text-lg font-black'>{name}</span>
          <span>⚡0.23A</span>
        </div>
        <Button onClick={toggleSolenoid} className={classNames(buttonStyles)}>
          {
            toggled ? "On" : "Off"
          }
        </Button>
      </div>
    )
  }
}

export default Solenoid;