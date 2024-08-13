import React from 'react'
import {Link} from 'react-router-dom';
import { Router } from 'react-router-dom'
const Notfound = () => {
  return (
    <>
    <Link to="/">
    <p className="goback">go back</p>

    </Link>
    <div className='error-section'>
        <h1>404</h1>
        <div>Page Not found</div>
    </div>
    </>
  )
}

export default Notfound