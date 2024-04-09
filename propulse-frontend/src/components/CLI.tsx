import React, { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames';
import { sendCommand } from '../api/cli';
import { CLIMessage, CLIMessageType } from '../interfaces/cli';


interface CLIProps {
  className?: string;
}

// Home Function: This is the homepage, should be located at (/).
const CLI: React.FC<CLIProps> = ({ className }) => {
  const [input, setInput] = useState<string>('');
  
  const [history, setHistory] = useState<CLIMessage[]>([]);
  const [historyCursor, setHistoryCursor] = useState<number>(0);
  const [inputHistory, setInputHistory] = useState<CLIMessage[]>([]);
  const [inputCount, setInputCount] = useState<number>(0);

  const scrollBottomRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {

      // Don't do anything if the input is empty
      if (input === '') return;

      // Send the command to the CLI
      sendCommand(input)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
        

      setHistory([
        ...history,
        {
          time: new Date(),
          message: input,
          type: CLIMessageType.INPUT
        }
      ])
      setInput('');
      setInputCount(prevInputCount => prevInputCount + 1);
      setHistoryCursor(0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistoryCursor(prevHistoryCursor => Math.min(prevHistoryCursor + 1, inputCount));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistoryCursor(prevHistoryCursor => Math.max(prevHistoryCursor - 1, 0));
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCLIEvent = useCallback((event: MessageEvent<any>) => {
    console.log(event.data);
    setHistory(prevHistory => [
      ...prevHistory,
      {
        time: new Date(),
        message: event.data,
        type: CLIMessageType.INFO
      }
    ]);
  }, []);

  // CLI Event Source
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8000/events');

    eventSource.addEventListener('cli', handleCLIEvent);

    eventSource.onerror = (error) => {
      console.log('Error: ', error);
    };
    return () => {
      eventSource.close();
    }
  }, [handleCLIEvent]);

  /*
    TERMINAL RELATED EFFECTS
  */
 // Scroll to bottom
  useEffect(() => {
    if (scrollBottomRef.current)
        scrollBottomRef.current.scrollTop = scrollBottomRef.current.scrollHeight;
  
  }, [history])
  
  // Terminal keybinds
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
      }
    });
  
    document.addEventListener('keyup', (e) => {
      if (e.ctrlKey && e.key === 'l') {
        setHistory([{
          time: new Date(),
          message: 'Cleared the screen.',
          type: CLIMessageType.SUCCESS
        }]);
      }
    });
  }
  , [])

  // History cursor
  useEffect(() => {
    if (historyCursor === 0) {
      setInput('');
      return;
    }
    
    setInput(inputHistory[inputCount - historyCursor].message);
  }, [historyCursor, inputHistory, inputCount])

  // Input history
  useEffect(() => {
    if (history.length === 0) return;
    if (history[history.length - 1].type !== CLIMessageType.INPUT) return;
    if (history[history.length - 1].message === '') return;
    setInputHistory(prevInputHistory => [...prevInputHistory, history[history.length - 1]]);
  }, [history])

  return (
    <div className={classNames([className, 'flex flex-col h-full bg-background-50'])}>
      <div ref={scrollBottomRef} className='h-full overflow-y-auto font-mono'>
        {
          history.map((cli_message, i) => {
            return (
              <p
                key={i}
                className={classNames({
                  'block': true,
                  'text-text-950': cli_message.type === CLIMessageType.INFO,
                  'text-red-500': cli_message.type === CLIMessageType.ERROR,
                  'text-yellow-500': cli_message.type === CLIMessageType.WARNING,
                  'text-green-500': cli_message.type === CLIMessageType.SUCCESS,
                  'text-primary-600 font-black': cli_message.type === CLIMessageType.INPUT
                })}
              >
                {cli_message.time !== null ? `[${cli_message.time.toTimeString().split(' ')[0]}] ` : null}{cli_message.type == CLIMessageType.INPUT ? '$ ' : ''}{cli_message.message}
              </p>
            )
          })
        }
      </div>
      <div className='flex p-2 rounded-md bg-background-200 font-mono'>
        <span className='text-xl font-black mr-2'>&gt;</span>
        <input 
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          type="text"
          className='w-full bg-transparent outline-none'
        />
      </div>
    </div>
  )
}

export default CLI
