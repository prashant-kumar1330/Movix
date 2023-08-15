import React, { useState } from 'react'
import "../style.scss"
import ContentWrapper from '../../../componensts/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../componensts/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../componensts/carousel/Carousel'


const Trending = () => {
  const [endPoint, setEndpoint]= useState("day")
  const {data,loading}= useFetch(`/trending/all/${endPoint}`);
  console.log(data);
  const onTabChange = (tab)=>{
    setEndpoint(tab==="Day"?"day":"week")
  }

  return (
     <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">
          Trending
        </span>
        <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange}/>
        
      </ContentWrapper>
      <Carousel data = {data?.results} loading={loading}></Carousel>
     </div>
    
    
  )
}

export default Trending