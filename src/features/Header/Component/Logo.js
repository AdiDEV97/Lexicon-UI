import { Button } from '@material-ui/core'
import React from 'react'
import Lexicon from '../../../Lexicon.png'
import { Link } from 'react-router-dom'

// Logo Component

const Logo = () => {
  return (
      <Link to='/home'><div className='imgLogo'><img className='logo' src={Lexicon} alt='lexocon.png' width="90" height="80" /></div></Link>
  )
}

export default Logo
