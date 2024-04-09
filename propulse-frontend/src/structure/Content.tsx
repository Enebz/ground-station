import { } from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './Header'
// import Footer from './Footer'
import Home from '../pages/Home'
import Dev from '../pages/Dev'
import CLIPage from '../pages/CLIPage'
import Stream from '../pages/Stream'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'

//mport Logo from '../assets/logo.png'


// Content Interface
interface ContentProps {

}

// Content Function: The content for the website.
const Content: React.FC<ContentProps> = () => {

  return (
    <Routes>
      <Route path='/stream' element={<Stream />} />
      <Route path='/cli' element={ <CLIPage /> } />
      <Route path='/*' element={
        <div id="content" className='flex flex-col h-screen overflow-y-auto bg-background-50'>
          <Header />
          <div className='flex flex-col grow'>
            <Routes>
              <Route path='/'>
                <Route index element={ <Home /> } />
              </Route>
              <Route path='/dev' element={ <Dev /> } />
              <Route path='/dashboard' element={ <Dashboard /> } />
              <Route path='/*' element={ <NotFound /> } />
            </Routes>
          </div>
        </div>
      } />
    </Routes>
  )
}

export default Content;