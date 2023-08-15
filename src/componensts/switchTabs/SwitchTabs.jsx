import React, { useState } from 'react'
import "./style.scss"
const SwitchTabs = ({data, onTabChange}) => {
  
   const [selectedTab, setSelectedTab] = useState(0);
   const [left,setLeft]= useState(0);
  const activetab = (tab, index)=>{
       setLeft(100*index);
       setTimeout(()=>{
        setSelectedTab(index);
       },300)
       onTabChange(tab);
  }

  return (
    <div className="switchingTabs">
     <div className="tabItems">
       {
        data.map((tab, index)=>(
         
          <span key={index}
           className={`tabItem ${selectedTab===index ? "active":""}`}
            onClick={()=>activetab(tab,index)}>
              {tab}
          </span>
       
        ))}
       <span className='movingBg' style={{left}}></span>
     </div>
    </div>
  )
}

export default SwitchTabs