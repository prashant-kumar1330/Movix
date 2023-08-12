import React from 'react'
import "../style.scss"
import ContentWrapper from '../../../componensts/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../componensts/switchTabs/SwitchTabs'



const Trending = () => {

  const onTabChange = ()=>{

  }

  return (
     <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">
          Trending
        </span>
        <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange}/>
      </ContentWrapper>
     </div>
    
    
  )
}

export default Trending