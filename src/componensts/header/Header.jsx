import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation(); 
    /* 
    useLocation hook return the location object and it has the location of the current page so if you want to perform any action 
    at the time of location change you can use this hook
    */


    // this effect will set the scroll to 0 when we go to other page
   useEffect(()=>{
      window.scrollTo(0,0)
   },[location])



   const handleScroll = ()=>{
        console.log(window.scrollY);
        if(window.scrollY>200){
          if(lastScrollY < window.scrollY && !mobileMenu ){
            setShow("hide");
          }
          else{
            setShow("top")
          }
        }
        else{
          setShow("top");
        }
   }
    
    useEffect(()=>{
       window.addEventListener("scroll",handleScroll);
 
       // always remove your event listner otherwise it will leak you memory
       return ()=>{
        window.removeEventListener("scroll",handleScroll);
       }
       
    },[lastScrollY])


    const openSearch = ()=>{
      setMobileMenu(false);
      setShowSearch(true);
    }

    const openMobileMenu = ()=>{
      setMobileMenu(true);
      setShowSearch(false);
    }
    const searchQueryHandler = (e)=>{
      if(e.key==='Enter' && query.length>0){
          navigate(`/search/${query}`);
          setTimeout(()=>{
             setShowSearch(false);
          },100)
      }
     
    }
    const navigationHandler= (type)=>{
      if(type==="movies"){
          navigate("/explore/movie")
      }
      else{
        navigate("/explore/tv")
      }
      setMobileMenu(false);
    }
    return (
       <header className={`header ${mobileMenu?  "mobileView":""} ${show}`}>
        <ContentWrapper>
          <div className="logo" onClick={()=>navigate("/")}>
                <img src={logo} alt=""></img>
          </div>
          <ul className="menuItems">
            <li className="menuItem" onClick={()=>{
              navigationHandler("movies");
            }}>Movies</li>
            <li className="menuItem" onClick={()=>{
              navigationHandler("tvShows");
            }}>TV shows</li>
            <li className="menuItem"><HiOutlineSearch onClick={openSearch}/></li>
          </ul>
          <div className="mobileMenuItems">
              <HiOutlineSearch onClick={openSearch}/>
            {mobileMenu ? <VscChromeClose onClick={()=>setMobileMenu(false)}/>:<SlMenu onClick={openMobileMenu}/>}
            
          </div>
        </ContentWrapper>
        {showSearch && <div className="searchBar">
          <ContentWrapper>
            
            <div className='searchInput'>
               <input type='text' 
                  placeholder='Search for Movie or TV Shows ...'
                  onKeyUp={searchQueryHandler}
                  onChange={(e)=>{
                    setQuery(e.target.value);
                   }}
               ></input>
         
             <VscChromeClose onClick={()=>setShowSearch(false)}/>
           </div>
          </ContentWrapper>
        </div> }
        
       </header>
    );
};

export default Header;