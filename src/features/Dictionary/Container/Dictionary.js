import React, { useState } from 'react'
import DictionayComponent from '../Component/DictionayComponent'

const Dictionary = () => {

  const [data, setData] = useState()
  
  function getCompData(obj) {
    setData(obj);
  }

  console.log('Data from Child -----> ');
  console.log(data);

  return (
    <div>
      <DictionayComponent fun = {getCompData} objData={data} />
    </div>
  )
}

export default Dictionary
