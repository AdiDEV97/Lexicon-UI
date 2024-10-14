import React from 'react'
import '../StyledComponent/Style.css'

// Footer Component

const FooterComponent = () => {

  var time = new Date()

  return (
    <div className='footer my-0'>
      ©{time.getFullYear()} Lexicon. All rights are reserved. Lexicon Confidential and/or Trade Secret.  ©Copyright {time.getFullYear()}
    </div>
  )
}

export default FooterComponent
