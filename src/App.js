import React from 'react'
import Landingpage from '../src/pages/LangingPage';
import './App.css';
import Notfound from '../src/components/Notfound';
import {Routes,Route} from 'react-router-dom';
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Landingpage/>}/>
      <Route path="/*" element={<Notfound/>}/>
    </Routes>
    </>
  )
}

export default App