import React, { useState } from 'react'
import HomePageContainer from '../Component/HomePageContainer'

// Home Page Container

const HomePage = (props) => {

  const [wordLen, setWordLen] = useState();

  return (
    <div>
      <HomePageContainer wordLen = {props.funHome} />
    </div>
  )
}

export default HomePage
