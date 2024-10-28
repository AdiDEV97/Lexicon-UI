import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Update Word Component

const UpdateComponent = () => {

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


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData1({...data1, [name] : value});
    //setDict(dict);
  }


  async function getDictionary() {
    const response = await axios.get(`${baseUrl}/word-book/app/dictionary`);
    //console.log(response.data);
    setDict(response.data);
    // console.log(dict);
    // setData1({word: response.data.word, meaning: response.data.meaning, serialNo: response.data.serialNo});
  }


  useEffect(() => {
    getDictionary();
  },[]);


  const updateWord = async (id, newWord) => {
    const response = await axios.put(`${baseUrl}/word-book/app/update-word/${id}`, newWord);
    //setDict([...dict]);
    console.log("=============Updated Data====================");
    console.log(response.data);
    
    
    console.log("=============intermediate Data====================");
    // console.log(dict);
    //navigate('/dictionary');
  }








  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    
    // updateWord(3105, data1);
    dict.map((ce) => {
      console.log('ce.id - ', ce.id);
      if(ce.id === updateId) {
        console.log('ce.id inside - ', ce.id);
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
    //setDict(data1);
    
    //navigate('/home');
    getDictionary();
    // navigate('/update-word');
    console.log('Navigated suceccessfully!!');
    // let confirm = window.confirm("Are you sure to change the data!")
    // if(confirm === true) {
      
    // }
    // else {
    //   getDictionary();
    //   navigate('/dictionary');
    //   console.log('Navigated suceccessfully!!');
    // }
    
    navigate('/dictionary');
  }


  return ( 

      <div className="popUpTable">
        <div className='form'>
          <form onSubmit={handleSubmitUpdate}>
            <table className="addWordForm my-2">
                  <tr className='addWordRow'>
                      <td className='addWordDataName'><h4>Word : </h4></td>
                      <td className='addWordDataInput'><input id='wordInput' name="word" type="text" placeholder="Word should be new" value={data1.word} onChange={handleChange}></input></td>
                  </tr>
                  <tr className='addWordRow'>
                      <td className='addWordDataName'><h4>Meaning : </h4></td>
                      <td className='addWordDataInput'><textarea id='meaningInput' name="meaning" placeholder="Type meaning of the word" rows="4" cols="40" value={data1.meaning} onChange={handleChange}></textarea></td>
                  </tr>
                  <tr className='addWordRow'>
                      <td className='addWordDataName'><h4>Serial No : </h4></td>
                      <td className='addWordDataInput'><input id='numberInput' name="serialNo" type="number" placeholder="Enter the Dictionary No." value={data1.serialNo} onChange={handleChange}></input></td>
                  </tr>
                  
                  <p>{data1.word + data1.meaning + data1.serialNo}</p>
            </table>
            <button className="btn1 btn-primary" type="submit">Update Word</button>
          </form>
        </div>
    </div>
  )
}

export default UpdateComponent
