import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import "../StyledComponent/Style.css";

// Dictionary Component

const DictionayComponent = (props) => {
  const [dict, setDict] = useState([]);

  const [data1, setData1] = useState({
    word: '',
    meaning: '',
    serialNo: ''
  });

  const [updateId, setUpdateId] = useState();

  const [popUpUpdate, setPopUpUpdate] = useState(false);

  const [addStyle, setAddStyle] = useState({
    filter: 'blur(0px)',
    pointerEvents: ''
  });


  const navigate = useNavigate();

  let baseUrl = "http://localhost:8080";

  async function getDictionary() {
    const response = await axios.get(`${baseUrl}/word-book/app/dictionary`);
    setDict(response.data);
  }

  const updateWord = async (id, newWord) => {
    const response = await axios.put(`${baseUrl}/word-book/app/update-word/${id}`, newWord);
  }



  useEffect(() => {
    getDictionary();
    document.title="Lexicon - Dictionary";
  },[]);


  // console.log("Dictionary - ");
  // console.log(dict);


  async function deleteData(id) {
    var userConfirmation = window.confirm("Once a word deleted cannot be retrived. Do you want ot delete? Please confirm.");

    if(userConfirmation === true) {
      await axios.delete(`${baseUrl}/word-book/app/delete-word/${id}`);
      setDict(dict.filter((ce) => {return(ce.id != id)}));
      console.log(`Data with id - ${id} is Deleted successfully.`);
    }
    else {
      setDict(dict);
      console.log(`Data with id - ${id} is not Deleted.`);
    }
  }


  const handleDelete = (id) => {
    deleteData(id);
    console.log(dict);
  }


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData1({...data1, [name] : value});
    setDict(dict);
  }


  const handleUpdate = (id) => {
    getDictionary();
    console.log('Popup - ' + popUpUpdate);
    if(popUpUpdate === false) {
      setPopUpUpdate(true);

      dict.map((ce) => {
        if(ce.id === id) {
          setUpdateId(id);
          setData1({word: ce.word, meaning: ce.meaning, serialNo: ce.serialNo});
        }
        
      })

      
      setAddStyle({
        filter: 'blur(3px)',
        pointerEvents: 'none',
        overflowY: ''
      });
      document.body.style.overflowY= 'hidden'
    }

    else {
      setPopUpUpdate(false);
      console.log('wordVal - ' + data1.word);
      setAddStyle({
        filter: 'blur(0px)',
        pointerEvents: '',
        overflowY: ''
      });
      document.body.style.overflowY= 'scroll';
    }
    if(popUpUpdate === true) {
      getDictionary();
    }
    
  }


  const handleSubmitUpdate = (e) => {
    getDictionary();
    e.preventDefault();

    dict.map((ce) => {
      if(ce.id === updateId) {
        updateWord(updateId, data1);
      }
    })
    
    console.log('Data to be Update - ');
    console.log(data1);
    setPopUpUpdate(false);

    setAddStyle({
      filter: 'blur(0px)',
      pointerEvents: '',
      overflowY: ''
    });

    document.body.style.overflowY= 'scroll';
    
    
    console.log('Navigated suceccessfully!!');
    
    props.fun("Hello world");

    console.log('From parent - ' + props.objData);

    ///////////////////////////////////
    // console.log('getDict - ' + 7);
    getDictionary();
    // console.log(dict);
    ///////////////////////////////////

    console.log('Popup - ' + popUpUpdate);

    getDictionary();
    
    navigate('/home');
    
    getDictionary();

    navigate('/dictionary');
    getDictionary();
  }

  const handleClose = () => {
    setPopUpUpdate(false);
    setAddStyle({
      filter: 'blur(0px)',
      pointerEvents: '',
      overflowY: ''
    })
    document.body.style.overflowY= 'scroll';
  }

  // Text to Speech
  const handleHear = (e) => {
    var hearWord = new SpeechSynthesisUtterance(e);
    var voices = window.speechSynthesis.getVoices();
    hearWord.voice = voices[1];
    window.speechSynthesis.speak(hearWord);
  }

  const sortById = [...dict].sort((a, b) => a.id - b.id);

  const sortByWord = [...dict].sort((a, b) => a.word.toLowerCase() > b.word.toLowerCase() ? 1 : -1);

  const sortByMeaning = [...dict].sort((a, b) => a.meaning.toLowerCase() > b.meaning.toLowerCase() ? 1 : -1);

  const sortBySrNo = [...dict].sort((a, b) => a.serialNo - b.serialNo);


  const handleTH = (e) => {
    const thName = document.getElementsByClassName(e.target.className)[0].innerHTML;

    if(thName === 'Id') {
      setDict(sortById);
    }
    else if(thName === 'Word') {
      setDict(sortByWord);
    }
    else if(thName === 'Meaning') {
      setDict(sortByMeaning);
    }
    else if(thName === 'Serial No.') {
      setDict(sortBySrNo);
    }
    
  }


  const updateWindow = <>
    <div className="popUpTable">
      <span className="material-symbols-rounded" onClick={handleClose}>cancel</span>
      <div className='form'>
        
        <form onSubmit={handleSubmitUpdate}>
          <table className="addWordForm my-2">
                <tr className='addWordRow'>
                    <td className='addWordDataName'><h4>Word : </h4></td>
                    <td className='addWordDataInput'><input id='wordInput' name="word" type="text" placeholder="Word should be new" value={data1.word} onChange={handleChange} autoFocus></input></td>
                </tr>
                <tr className='addWordRow'>
                    <td className='addWordDataName'><h4>Meaning : </h4></td>
                    <td className='addWordDataInput'><textarea id='meaningInput' name="meaning" placeholder="Type meaning of the word" rows="4" cols="40" value={data1.meaning} onChange={handleChange}></textarea></td>
                </tr>
                <tr className='addWordRow'>
                    <td className='addWordDataName'><h4>Serial No : </h4></td>
                    <td className='addWordDataInput'><input id='numberInput' name="serialNo" type="number" placeholder="Enter the Dictionary No." value={data1.serialNo} onChange={handleChange}></input></td>
                </tr>
          </table>
          <button className="btn1 btn-primary" type="submit">Confirm Update</button>
        </form>
      </div>
    </div>
  </>;


  return (
    <div className="DictionaryDisplay my-5" >
      <Grid item container>
        <Grid item lg={11}><h2 style={addStyle}>Dictionary(Words - {dict.length})</h2></Grid>
        <Grid item lg={1}><button id='refresh' title="Refresh the dictionary" className="material-symbols-rounded mx-2" onClick={() => getDictionary()}>sync</button></Grid>
      </Grid>
      
      <div style={addStyle}>
        <table className="dictTable my-5">
          <tr className="tableRow">
            <th className='h_id' onClick={handleTH} title="Sort By Id">Id</th>
            <th className='h_word' onClick={handleTH} title="Sort By Word">Word</th>
            <th className='h_meaning' onClick={handleTH} title="Sort By Meaning">Meaning</th>
            <th className='h_srNo' onClick={handleTH} title="Sort By Serial No">Serial No.</th>
            <th><span className="material-icons-sharp">Operations</span></th>
          </tr>
          {dict.map((ce, index) => {
            return (
              <tr className="tableRow" key={index}>
                {/* <td className='id'>{ce.id}</td> */}
                <td className='id'>{index + 1}</td>
                <td className='word' onClick={() => handleHear(ce.word)} title="Click for pronunciation">{ce.word}</td>
                <td className='meaning'>{ce.meaning}</td>
                <td className='serialNo'>{ce.serialNo}</td>
                <td className='isDelete'><span className="material-icons mx-2" title="Delete this Word?" onClick={()=> { handleDelete(ce.id) }}>delete</span>
                <span className="material-symbols-rounded" title="You can edit this word" onClick={() => handleUpdate(ce.id)}>Update</span></td>
              </tr>
            );
          })}
        </table>
        <button className='btn1 btn-primary' onClick={() => getDictionary()}>Refresh</button>
      </div>
      
      <br></br>
      {popUpUpdate ? updateWindow : null}
    </div>
  );
};

export default DictionayComponent;
