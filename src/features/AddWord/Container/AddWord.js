import React, { useState } from 'react'
import AddWordComponent from '../Conponent/AddWordComponent'

const AddWord = (props) => {

  const [dict, setDict] = useState([]);

  // To Get Value
  function addWordComponent_to_addWord(data) {
    setDict(data);
    props.funAddWord(dict);
  }

  console.log("Words - ");
  console.log(dict);

  return (
    <div>
      <AddWordComponent fun = {addWordComponent_to_addWord} dictData = {dict} />
    </div>
  )
}

export default AddWord
