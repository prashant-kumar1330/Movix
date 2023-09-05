import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./style.scss"
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../componensts/lazyLoadImage/Img'
import ContentWrapper from '../../../componensts/contentWrapper/ContentWrapper'

const POPULAR_MOVIES= "/movie/popular";

const HeroBanner = () => {
  const[bgImage, setBgImage] = useState("");
  const[query,setQuery]= useState("");
  const navigate = useNavigate(); // this hook will navigate you to your desired path
  console.log("before")
  const {data,error,loading} = useFetch(POPULAR_MOVIES);
  const {url} = useSelector((state)=> state.home)
 console.log(data);
  useEffect(()=>{
   
    if(data){
      const bg_image = url.backdrop_img_size+ data?.results[Math.floor(Math.random()*20)]?.backdrop_path;
      setBgImage(bg_image);
      
    }
    
     console.log("hh")
      
  },[data])

  console.log("i am below useeffect")
  const searchQueryHandler = (e)=>{
    if(e.key==='Enter' && query.length>0){
        navigate(`/search/${query}`);
    }
  }
   
  return (
    <div className='heroBanner'>
      {!loading && <div className='backdrop-img'>
             <Img src={bgImage}/>
      </div>}
      <div className="opacity-layer"></div>
      <ContentWrapper>
      <div className='heroBannerContent'>
           <span className='title'>Welcome,</span>
           <span className='subTitle'>Millions of movies, TV shows and people to discover. Explore now </span>
           <div className='searchInput'>
               <input type='text' 
                  placeholder='Search for Movie or TV Shows ...'
                  onKeyUp={searchQueryHandler}
                  onChange={(e)=>{
                    setQuery(e.target.value);
                   }}
               ></input>
               <button onClick={
                ()=>{
                  if(query.length>0){
                    navigate(`/search/${query}`);
                  }
                }
               }>

                  Search
                </button>
           </div>
           
       </div>
      </ContentWrapper>

    

     </div>

   
  )
}

export default HeroBanner