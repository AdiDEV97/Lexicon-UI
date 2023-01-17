import React, { useEffect, useState } from 'react'
import SearchComponent from '../Component/SearchComponent'

const Search = (props) => {

  const [data, setData] = useState({word:'', meaning:'', serialNo:null});

  const [dict, setDict] = useState([]);

  
  

  function childToParent (a) {
    // setData({word: a.word, meaning: a.meaning, serialNo: a.serialNo});
    setDict(a)
    
  }

  useEffect(() => {
    childToParent();
  }, []);


  console.log("Data - ");
  console.log(data);
  console.log("Dict - ");
  console.log(dict);

  console.log('Dict from Index to Child - ');
  console.log(props.fullDict);

  return (
    <div>
      <SearchComponent pass={childToParent} pd={data} passWord={data.word} passMeaning={data.meaning} passSrNo={data.serialNo} fullDict={props.fullDict} />
      {/* passWord={data.word} passMeaning={data.meaning} passSrNo={data.serialNo} */}
    </div>
  )
}

export default Search
