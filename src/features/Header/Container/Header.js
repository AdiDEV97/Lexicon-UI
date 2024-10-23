import React from 'react'
import Heading from '../Component/Heading'
import Logo from '../Component/Logo'
import Mode from '../Component/Mode'
import Grid from '@material-ui/core/Grid'
import '../StyledComponents/Style.css'

// Header Container

const Header = () => {
  return (
    <div className='header'>
      <Grid className='fullGrid' item xs={12} container>
        <Grid className="grid1" item lg={1}>
            <Logo />
        </Grid>
        <Grid className='grid2' item lg={10}>
            <Heading />
        </Grid>
        <Grid className='grid3' item lg={1}>
            <Mode />
        </Grid>
      </Grid>
    </div>
  )
}

export default Header
