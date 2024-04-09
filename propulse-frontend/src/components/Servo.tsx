import { useState } from 'react';
import Button from '../components/Button';
import classNames from 'classnames';
import { sendCommand } from '../api/cli';
import Field from './Field';

interface ServoProps {
  name?: string;
}


const Servo: React.FC<ServoProps> = ({name}) => {
  const [position, setPosition] = useState<string>("");


  const buttonStyles: {
    [key: string]: boolean;
  } = {
    "w-full flex-1": true,
  }

  const onCloseServo = () => {
    sendCommand(`servo set ${name} closed`);
  }

  const onOpenServo = () => {
    sendCommand(`servo set ${name} open`);
  }

  const handleChange = (event: any) => {
    sendCommand(`servo setpercent ${name} ${position}`);
  }

  const onPositionChange = (event: any) => {
    setPosition(event.target.value);
  }

  return (
    <div className='flex flex-col px-4 pb-4 pt-2 rounded-md dark:bg-stone-800 bg-slate-200 h-full w-full'>
      <div className='flex flex-row items-center space-x-2'>
        <span className='w-4 h-4 dark:fill-white fill-black'>S</span>
        <span className='text-lg font-black'>{name}</span>
        <span>⚡0.23A</span>
      </div>
      {/* Servo poses */}
      <div className='flex flex-col space-y-4'>
        <Field 
          title="Position"
          type="number"
          value={position}
          onChange={onPositionChange}
          onEnter={handleChange}
        />
        <div className='flex flex-row space-x-2'>
          <Button onClick={onCloseServo} className='btn-red active:btn-red-active w-full'>Close</Button>
          <Button onClick={onOpenServo} className='btn-green active:btn-green-active w-full'>Open</Button>
        </div>
      </div>
    </div>
  )
}

export default Servo;