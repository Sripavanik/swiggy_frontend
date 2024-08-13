import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProduct';
import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts';
import resvid from '../assets/resback.mp4';
const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showFirm, setShowFirm] = useState(false);
    const [showProduct, setShowProduct] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [showAllProducts, setShowAllProducts] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [showFirmTitle,setShowFirmTitle]=useState(true);

    useEffect(() => {
        const loginToken = localStorage.getItem('loginToken');
        if (loginToken) {
            setShowLogout(true);
        } else {
            setShowLogout(false);
        }
    }, []);
    useEffect(()=>{
      const firmName=localStorage.getItem('firmName');
      if(firmName){
        setShowFirmTitle(false);
      }
    }, []);
    const LogoutHandler = () => {
      alert("Are you sure to logout");
        localStorage.removeItem("loginToken");
        localStorage.removeItem("firmId");
        localStorage.removeItem("firmName");
        setShowLogout(false); // Update state to hide logout option
        setShowLogin(false);
        setShowRegister(false);
        setShowFirm(false);
        setShowProduct(false);
        setShowWelcome(false);
        setShowAllProducts(false);
        setShowFirmTitle(true);
    }

    const showLoginHandler = () => {
        setShowLogin(true);
        setShowRegister(false);
        setShowFirm(false);
        setShowProduct(false);
        setShowWelcome(false);
        setShowAllProducts(false);
    }

    const showWelcomeHandler = () => {
        setShowRegister(false);
        setShowLogin(false);
        setShowFirm(false);
        setShowProduct(false);
        setShowWelcome(true);
        setShowAllProducts(false);
    }

    const showRegisterHandler = () => {
        setShowRegister(true);
        setShowLogin(false);
        setShowFirm(false);
        setShowProduct(false);
        setShowWelcome(false);
        setShowAllProducts(false);
    }

    const showFirmHandler = () => {
      if(showLogout){
        setShowRegister(false);
        setShowLogin(false);
        setShowFirm(true);
        setShowProduct(false);
        setShowWelcome(false);
        setShowAllProducts(false);
    }else{
      alert("please login");
      setShowLogin(true);
    }
  }

    const showProductHandler = () => {
      if(showLogout){
        setShowRegister(false);
        setShowLogin(false);
        setShowFirm(false);
        setShowProduct(true);
        setShowWelcome(false);
        setShowAllProducts(false);
    }
    else{
      alert("please login");
      setShowLogin(true);
    }
  }

    const showAllProductsHandler = () => {
      if(showLogout){
        setShowRegister(false);
        setShowLogin(false);
        setShowFirm(false);
        setShowProduct(false);
        setShowWelcome(false);
        setShowAllProducts(true);
    }
    else{
      alert("please login");
      setShowLogin(true);
    }
  }

    return (
        <>
            <section className='landingsection'>
                <Navbar 
                    showLoginHandler={showLoginHandler} 
                    showRegisterHandler={showRegisterHandler} 
                    showLogout={showLogout} 
                    LogoutHandler={LogoutHandler} 
                />
                <div className="colletionSection">
              
                    <Sidebar 
                        showFirmHandler={showFirmHandler} 
                        showProductHandler={showProductHandler}
                        showAllProductsHandler={showAllProductsHandler}
                        showFirmTitle={showFirmTitle}
                    />
                    {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
                    {showRegister && <Register showLoginHandler={showLoginHandler} />}
                    {showFirm && showLogout && <AddFirm />}
                    {showProduct && showLogout && <AddProduct />}
                    {showWelcome && <Welcome />}
                    {showAllProducts && showLogout &&  <AllProducts />}
                </div>
            </section>
        </>
    );
}

export default LandingPage;
