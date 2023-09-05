import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
const Carousel = ({data,loading,endpoint, title}) => {
 const carouselContainer = useRef(); // this hook is to capture any div or element , similar to getElementBYId
  console.log(carouselContainer?.current); // this is how you can print it on console
  console.log(data);
   const {url}= useSelector((store)=>store.home)
const navigate = useNavigate();
   const navigation = (direction)=>{
     const container = carouselContainer?.current;
    console.log(carouselContainer.current);
     const scrollAmount = direction==="left"?container?.scrollLeft-(container?.offsetWidth+20):
     container?.scrollLeft+(container?.offsetWidth+20);

     container?.scrollTo({
        left:scrollAmount,
        behavior:"smooth"
     })

   }
   const skItem= ()=>{
    return(
        <div className="skeletonItem">
            <div className="posterBlock skeleton"> </div>
            <div className="textBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
            </div>
        </div>
    )
  }

  return (
    
    <div className="carousel">
        <ContentWrapper>
          {title && <div className="carouselTitle">{title}</div>}
            <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={()=>{navigation("left")}} />
            <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={()=>{navigation("right")} }/>
            {
                !loading?(
                    
                    <div className="carouselItems" ref={carouselContainer}>
                   {
                  
                    data?.map((item)=>{
                        console.log("hello loading")
                        const poster_url = item.poster_path?
                        url.poster_img_size+item.poster_path:PosterFallback;
                       // console.log(poster_url);
                       console.log(endpoint);
                    return(
                        <div key={item.id} className="carouselItem" onClick={()=>{navigate(`/${item.media_type!==undefined?item.media_type:endpoint}/${item.id}`)}}>
                          <div className="posterBlock">
                            <Img src={poster_url}></Img>
                          </div>
                          <div className="textBlock">
                            <span className="title">
                                {item?.title || item?.name}
                            </span>
                            <span className="title">
                                {dayjs(item.release_Date).format("MMM D, YYYY")}
                            </span>
                          </div>
                        </div>
                    )
                    })
                   }
                    </div>
                ):(
              
                   <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                   </div>
                 
                  
                )
            }
        </ContentWrapper>
    </div>
  )
}

export default Carousel