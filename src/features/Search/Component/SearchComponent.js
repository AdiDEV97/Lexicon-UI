import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../StyledComponent/Style.css";

// Search Component

const SearchComponent = (props) => {

  const [dict, setDict] = useState([])

  const [word, setWord] = useState('');

  const [array, setArray] = useState([]);

  const [findWord, setFindWord] = useState('');

  const [searchPop, setSearchPop] = useState(false);

  const [notFoundPop, setNotFoundPop] = useState(false);

  const [searchingText, setSearchingText] = useState(false);

  const [popData, setPopData] = useState();
  const [flag, setFlag] = useState(false);

  const s1 = {word:'Clocking', meaning:'Timer device', serialNo:23};
  const s2 = 'Hello Search Component...';
  const s3 = [{word:'Clocking', meaning:'Timer device', serialNo:23}, {word:'Hook', meaning:'Hanger', serialNo:24}]

  let baseUrl = "http://localhost:8080";

  async function getDictionary() {
    const response1 = await axios.get(`${baseUrl}/word-book/app/dictionary`);
    //console.log(response1.data);
    console.log("getDictionary called");
    setDict(response1.data);
}

  useEffect(() => {
    getDictionary();
    props.pass(s3);
    //setDict(props.fullDict);
    setSearchPop(false);
    setNotFoundPop(false);
    setWord('');
    setSearchingText(false);
    document.getElementById('searchInput').value = '';
    document.title="Lexicon - Search";
  }, [])

  const handleChange = (e) => {
    let value = e.target.value;
    setWord(value);
    setSearchPop(false);
    console.log('Word - ' + value);
    // setNotFoundPop(true);
    setSearchingText(true);

    if(value === '') {
      setWord(value);
    }
    else {
      setWord(value);
    }
  }


  async function getWordByName(wordName) {
    try{
      const response = await axios.get(`${baseUrl}/word-book/app/dictionary-word/${wordName.toString()}`);
    setFlag(true);
    setWord(response.data);
    console.log("Get data By word - ");
    console.log(response.data);
    setSearchPop(true);
    console.log('inside try');
    console.log('-----------------------------------------------------------------------------------');
    }
    catch(err) {
      console.log('insie catch');
      // setSearchPop(false);
      setNotFoundPop(true);
      
    }
  }
  
  const handleCheck = (e) => {
    e.preventDefault();
    console.log('Word in check - ' + word);
    getWordByName(word);
    console.log('Flag - ' + flag);
    
    setSearchingText(false);
    setFlag(false);
    setWord(word);
    // document.getElementById('searchInput').value = '';
    
  }

  // Text to Speech
  const handleHear = (e) => {
    var hearWord = new SpeechSynthesisUtterance(e);
    var voices = window.speechSynthesis.getVoices();
    hearWord.voice = voices[1];
    window.speechSynthesis.speak(hearWord);
  }


  
  const searchWord = <>
    <div className="searchDiv my-5" style={{backgroundColor: 'rgb(121, 169, 171)'}}>
      
      <table>
        <tr>
          <td className='dataName'><h4>Word - </h4></td>
          <td className='dataValue'><h5>{word.word}</h5></td>
        </tr>
        <tr>
          <td className='dataName'><h4>Meaning - </h4></td>
          <td className='dataValue'> <h5>{word.meaning}</h5></td>
        </tr>
        <tr>
          <td className='dataName'><h4>Serial No - </h4></td>
          <td className='dataValue'><h5>{word.serialNo}</h5></td>
        </tr>
      </table>
      <span className="material-symbols-rounded" onClick={() => handleHear(word.word)} title="Click for pronunciation">volume_up</span>
    </div>
  </>

  const searching = <>
  <div className="searchDiv1 my-4 text-center">
    <p>Searching...</p>
  </div>
  </>

  ////////////////////////////////////////////////////////////////////////////////////////////////
  //                             try with   "FILTER"
  ////////////////////////////////////////////////////////////////////////////////////////////////

  const notFound = <>
    <div className="searchDiv1 my-4 text-center">
      <p style={{color:'red'}}>Word not Found!! You can add '{word}'.</p>
    </div>
  </>

  return (
    <div className = 'searchDisplay my-5'>
      <h2>You can search your word here...</h2>
      <input className='searchInput my-4' id='searchInput' type='search' onChange={handleChange} placeholder='Type something...' autoFocus></input><br/>
      <button className='btn1 btn-primary my-2' onClick={handleCheck}>Check</button>
      
      {/* {searchPop ? searchWord : <h5>Searching...</h5>} */}
      
      {/* {searchPop ? searchWord : notFoundPop ? notFound : null} */}
      {/* {searchPop ? searchWord : notFoundPop ? searching : notFound} */}
      {/* {notFoundPop ? notFound : null} */}
      {/* {searchPop ? searchWord : searchingText ? searchWord : notFoundPop ? notFound : null} */}
      {searchingText ? searching : searchPop ? searchWord : notFoundPop ? notFound : null}
      {/* {searchingText ? searching : searchPop ? searchWord : notFound} */}
      
    </div>
  )
}

export default SearchComponent
