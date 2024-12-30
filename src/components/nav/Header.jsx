import React from 'react'
import Menu from './Menu'
import TopBar from './TopBar'
import MainNav from './Nav'
import MegaMenu from './Menu'

const Header = () => {
  return (
    <>
      <TopBar />
       <header className="sticky top-0 z-50 bg-gray-800/95 backdrop-blur-sm shadow-lg">
       
        <MainNav />
        <MegaMenu />
     </header>
    </>
  )
}

export default Header