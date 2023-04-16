import axios from 'axios';
import React, { useState, useEffect } from 'react'
import '../StyledComponent/Style.css'

const HomePageContainer = (props) => {

  const [dict, setDict] = useState([]);

  const [num, setNum] = useState(0);

  const [val, setVal] = useState();


let baseUrl = "http://localhost:8080";

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getDictionary() {
    const response = await axios.get(`${baseUrl}/word-book/app/dictionary`);
    setDict(response.data);
  }
  

  useEffect(() => {
    getDictionary();
    setNum(dict.length);
    setVal(props.wordLen);
    document.title="Lexicon - Home"
  }, []);


  // const randomNumber = () => {
  //   var number = Math.floor(Math.random()*dict.length);
  //   setNum(number)
  // }

  console.log('Dict Length - ' + dict.length);
  var number = Math.floor(Math.random()*dict.length);
  console.log("Random Number - " + number);


  console.log("UseEffect 1 -- ");
      
  console.log("Dict - ")
  console.log(dict);

  // Text to Speech
  const handleHear = (e) => {
    var hearWord = new SpeechSynthesisUtterance(e);
    var voices = window.speechSynthesis.getVoices();
    hearWord.voice = voices[1];
    window.speechSynthesis.speak(hearWord);
  }


  // const [num, setNum] = useState(Math.floor(Math.random()*dict.length));
  

  return (
    <div className='display my-5'>
      <h2>Welcome to Lexicon</h2>
      <div className='wordHeading'>
        <div className="todaysWord"><span></span><h4>Today's Word </h4><span className="material-symbols-rounded" onClick={() => handleHear(dict[number].word)} title="Click for pronunciation">volume_up</span></div>
        {/* Try to use map function on the dict and traverse till number */}
            
            {dict.map((ce, index) => {
              if(index === number) {
                return (
                  <div className='wordBlock' key={index}>
                    <h3 className="dailyWord">{ce.word.toUpperCase()}</h3>
                    <br/>
                    <h6 className="dailyMeaning">{ce.meaning}</h6>
                  </div>
                )
              }
            })}
        
      </div>
      {/* <button className='btn1 btn-primary m-4' onClick = {randomNumber}>Shuffle</button> */}
    </div>
  )
}

export default HomePageContainer
