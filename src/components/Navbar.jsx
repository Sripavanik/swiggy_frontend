import React from 'react'
const Navbar = ({showLoginHandler,showRegisterHandler,showLogout,LogoutHandler}) => {
  const firmName=localStorage.getItem('firmName');

    console.log(showLoginHandler)
  return (
    <div className="navSection">
        <div className="company">
            Vendor Dashboard
        </div>
        <div className="firm-name">
          <h4>{firmName}</h4>
        </div>
        <div className="userAuth">
          {!showLogout? <>
          <span onClick={showLoginHandler}>Login / </span>
          <span onClick={showRegisterHandler}>Register</span>
          </>:<span onClick={LogoutHandler}>Logout</span>}
        </div>
    </div>
  )
}

export default Navbar