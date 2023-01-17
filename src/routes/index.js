//import { Switch } from '@material-ui/core'
import { Routes, Route, Navigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import HomePage from '../features/Home/Container/HomePage'
import AddWord from '../features/AddWord/Container/AddWord'
import Dictionary from '../features/Dictionary/Container/Dictionary'
//import Update from '../features/UpdateWord/Container/Update'
import Search from '../features/Search/Container/Search'
//import 'font-awesome/css/font-awesome.min.css';

const Routers = () => {

  const [dict, setDict] = useState([]);

  function addWord_to_index(data) {
      setDict(data);
      console.log("Dict in Index - ");
      console.log(dict);
    }
  useEffect(() => {
    addWord_to_index();
  },[]);
  

  return (
    <Routes>
        <Route path='/home' element={<HomePage funHome = {addWord_to_index}/>} />
        <Route path='/add-word' element={<AddWord funAddWord = {addWord_to_index} dictIndex={dict}/>} />
        <Route path='/dictionary' element={<Dictionary/>} />
        <Route path='/search' element={<Search dictWords = {addWord_to_index} fullDict={dict}/>} />
        <Route path="/" element={<Navigate replace to="/home" />} />
    </Routes>
  )
}

export default Routers
