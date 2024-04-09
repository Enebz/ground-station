import CLI from '../components/CLI';
import Rocket from '../components/Rocket';
import Solenoid from '../components/Solenoid';
import Page from '../structure/Page';

// Home Function: This is the homepage, should be located at (/).
const Dev: React.FC = () => {  
  return (
    <Page>
      <div className='flex flex-row space-x-4 h-full'>
        <div className='flex flex-col space-y-4 w-1/2'>
          <div>
            <h1 className='text-2xl font-black'>Solenoids (default)</h1>
            <div className='grid grid-flow-row grid-cols-2 gap-2 w-fit'>
              {
                Array(4).fill(0).map((_, i) => <Solenoid name={`Solenoid ${i+1}`} key={i} />)
              }
            </div>
          </div>
          <div>
            <h1 className='text-2xl font-black'>Solenoids (inline)</h1>
            <div className='grid grid-flow-row grid-cols-2 gap-2 w-fit'>
              {
                Array(4).fill(0).map((_, i) => <Solenoid name={`Solenoid ${i+1}`} inline key={i} />)
              }
            </div>
          </div>
        </div>
        <div className='flex flex-col w-1/2'>
          <CLI className="h-full w-full" />
          <div className='h-full'>
            <Rocket />
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Dev
