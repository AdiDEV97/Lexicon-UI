import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../StyledComponent/Style.css'
import { useNavigate } from "react-router-dom";

const AddWordComponent = (props) => {

    const [data, setData] = useState({
        word : '',
        meaning : '',
        serialNo : ''
    });

    const [dict, setDict] = useState([]);


    const [info, setInfo] = useState({
        info : ''
    });

    const [color, setColor] = useState({
        'color' : ''
    });

    const [time, setTime] = useState('');

    const navigate = useNavigate();

    var date = new Date();

    //setTime(date.getTime());


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData({...data, [name] : value});
    }

    // Add Word Data to the database
    let baseUrl = 'http://localhost:8080';

    async function getDictionary() {
        const response1 = await axios.get(`${baseUrl}/word-book/app/dictionary`);
        //console.log(response1.data);
        console.log("getDictionary called");
        setDict(response1.data);
    }

    // Here we use useEffect hook to update the data after every refresh
    useEffect(() => {
        getDictionary();
        document.title="Lexicon - Add Word";
    }, []);
    
    async function addNewWord(newWord) {
        const response = await axios.post(`${baseUrl}/word-book/app/new-word`, newWord);
        console.log(response);
        getDictionary();
    }

    //getDictionary();

    const handleSubmit = (event) => {
        //getDictionary();
        event.preventDefault();
        console.log(data);
        

        var flag = false;        

        for(var i=0; i<dict.length; i++) {
            //console.log("Word " + i + " " +dict[i].word + " ==== " + data.word.toLowerCase());
            if(dict[i].word.toLowerCase() === data.word.toLowerCase()) {
                flag = true;
                console.log(flag);
                break;
            }
        }

        if(data.word === '' || data.meaning === '' || data.serialNo === '') {
            setInfo({
                info : '*Make sure that all fields should be filled !!!'
            });
            setColor({
                'color' : 'red'
            });
        }
        else {
            if(flag === false) {
                console.log('flag - ' + flag)
                addNewWord(data);
                console.log((`Word "${data.word}" added successfully !!!`));
                setInfo({
                    info : `*Word "${data.word}" added successfully !!!`
                });
                setColor({
                    'color' : 'green'
                });
            }
            else {
                console.log('flag - ' + flag)
                console.log((`Word "${data.word}" already available !!!`));
                setInfo({
                    info : `*Word "${data.word}" already available !!!`
                });
                setColor({
                    'color' : 'red'
                });
            }
        }
       
        setTimeout(sayHello, 3000);
        

        // Passing props to parent component
        // props.fun(dict.length);
        
        props.fun(dict);

    }

    const sayHello = () => {
        setInfo("");
    }

    const handleReset = () => {
        setData({
            word : '',
        meaning : '',
        serialNo : ''
        });
    }


  return (
    <div className="display my-5">
      <h2>Add New Word</h2>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <table className="addWordForm my-2">
            <tr className='addWordRow'>
                <td className='addWordDataName'><h4>Word : </h4></td>
                <td className='addWordDataInput'><input id='wordInput' name="word" type="text" placeholder="Word should be new" value={data.word} onChange={handleChange}></input></td>
            </tr>
            <tr className='addWordRow'>
                <td className='addWordDataName'><h4>Meaning : </h4></td>
                {/* <td><input id='input' name="meaning" type="text" placeholder="Type meaning of the word" value={data.meaning} onChange={handleChange}></input></td> */}
                <td className='addWordDataInput'><textarea id='meaningInput' name="meaning" placeholder="Type meaning of the word" rows="4" cols="40" value={data.meaning} onChange={handleChange}></textarea></td>
            </tr>
            <tr className='addWordRow'>
                <td className='addWordDataName'><h4>Serial No : </h4></td>
                <td className='addWordDataInput'><input id='numberInput' name="serialNo" type="number" placeholder="Enter the Dictionary No." value={data.serialNo} onChange={handleChange}></input></td>
            </tr>
          </table>

          <button className="btn1 btn-primary my-3 mx-3" type='submit'>Add to Lexicon</button>
          <button className="btn1 btn-primary my-3 mx-3" type='button' onClick={handleReset}>Reset</button>
          

        </form>
        
      </div>
      {info.info ? <p className='errors' style={color}>{info.info}</p> : ''}
    </div>
  );
};

export default AddWordComponent;
