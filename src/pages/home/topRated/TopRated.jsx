import React, { useState } from 'react'
import "../style.scss"
import ContentWrapper from '../../../componensts/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../componensts/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../componensts/carousel/Carousel'
const TopRated = () => {
    const [endPoint, setEndpoint]= useState("movie")
    const {data,loading}= useFetch(`/${endPoint}/top_rated`);
    console.log(data);
    const onTabChange = (tab)=>{
      setEndpoint(tab==="Movies"?"movie":"tv")
    }
  
    return (
       <div className="carouselSection">
        <ContentWrapper>
          <span className="carouselTitle">
           Top Rated
          </span>
          <SwitchTabs data={["Movies","Tv shows"]} onTabChange={onTabChange}/>
          
        </ContentWrapper>
        <Carousel data = {data?.results} loading={loading} endpoint={endPoint}></Carousel>
       </div>
      
      
    )
}

export default TopRated