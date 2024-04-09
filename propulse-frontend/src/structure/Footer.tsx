import classNames from 'classnames';
import { } from 'react'

import { FaInstagram, FaFacebook, FaSlack } from 'react-icons/fa'

import Logo from '../assets/logo.png'


// Footer Interface
interface FooterProps {

}

// Footer Function: The footer for the website.
const Footer: React.FC<FooterProps> = () => {
  const footerClasses = {
    'text-text-950 dark:text-text-50': true,
    'w-full p-8': true,
    'bg-secondary-800': true,
    'space-y-28': true
  }

  const footerSectionWrapperClasses = {
    'flex flex-row': true,
    'divide-x-2 divide-accent-800 dark:divide-accent-200': true,
  };

  const footerSectionClasses = {
    'flex flex-col space-y-8': true,
    'w-full px-20': true,
  }

  return (
    <div className={classNames(footerClasses)}>
      <div className={classNames(footerSectionWrapperClasses)}>
        <div className={classNames(footerSectionClasses)}>
          <div className='flex flex-row items-center space-x-8'>
            <img className='h-16 w-16' src={Logo} />
            <p className='dark:text-text-50 text-text-950 font-black text-3xl'>Template</p>
          </div>
          <div className='space-y-2'>
            <p className='font-bold'>Found a bug?</p>
            <p>Send us a mail.</p>
          </div>
        </div>
        <div className={classNames(footerSectionClasses)}>
          <div className='space-y-2'>
            <p className='font-bold'>Address</p>
            <p>Templatehuset</p>
            <p>Templateveien 5, 7034 Templateby</p>
          </div>
          <div className='space-y-2'>
            <p className='font-bold'>Opening hours</p>
            <p>Alle workdays, 08:00 - 18:00</p>
          </div>
          <div className='space-y-2'>
            <p className='font-bold'>Contact us</p>
            <a href='mailto:template@template.com'>template@template.com</a>
            <div className='flex flex-row justify-start space-x-8 h-10'>
              <FaInstagram className='h-full w-10' />
              <FaFacebook className='h-full  w-10' />
              <FaSlack className='h-full  w-10' />
            </div>
          </div>
        </div>
        <div className={classNames(footerSectionClasses)}>
          <p>Lorem ipsum</p>
        </div>
      </div>
      <div className='flex flex-row space-x-32 justify-center'>
        <p className='text-2xl font-light'>TEMPLATE</p>
        <p className='text-2xl font-light'>Company</p>
        <p className='underline'>Guidelines for use</p>
        <p>© 2023 Template</p>
      </div>
    </div>
  )
}

export default Footer