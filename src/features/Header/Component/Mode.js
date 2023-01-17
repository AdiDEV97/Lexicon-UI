import React, {useState } from 'react'
import '../StyledComponents/Style.css'

const Mode = () => {

    let myStyle = {
        backgroundColor: 'rgb(24, 24, 83)',
        color: 'white',
        border: 'none'
    };

    const [modeName, setModeName] = useState('Dark Mode')

    const toggle = () => {

        if(modeName === 'Dark Mode') {
            setModeName('Lite Mode')
            document.body.style.backgroundColor = 'rgb(37, 37, 37)';
            document.body.style.color = 'white';
            document.body.style.borderColor = "white";
        }
        if(modeName === 'Lite Mode') {
            setModeName("Dark Mode")
            document.body.style.backgroundColor = 'white';
            document.body.style.color = 'rgb(37, 37, 37)';
            document.body.style.borderColor = "black";
        }
    }

  return (
    <div className='heading mx-right-2'>
        <button className='mode' type='button' onClick={toggle}>{modeName}</button>
    </div>
  )
}

export default Mode
