import React from 'react'
import { Link } from 'react-router-dom'
import '../StyledComponent/Style.css'

const SideNavComponent = () => {

  return (
    <div className='sideNav my-5'>
      <Link to='/home'><div className='btn' id='btn' name='home'><span className='home'>Home</span></div></Link>
      <Link to='/add-Word'><div className='btn' id='btn' name='addWOrd'><span>Add Word</span></div></Link>
      <Link to='/dictionary'><div className='btn' id='btn' name='dictionary'><span>Dictionary</span></div></Link>
      <Link to='/search'><div className='btn' id='btn' name='search'><span><>Search</></span></div></Link>
    </div>
  )
}

export default SideNavComponent
