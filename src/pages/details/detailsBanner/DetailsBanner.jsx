import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { PlayIcon } from "../Playbutton";
import "./style.scss";

import ContentWrapper from '../../../componensts/contentWrapper/ContentWrapper'
import useFetch from "../../../hooks/useFetch";
import Img from '../../../componensts/lazyLoadImage/Img'
import PosterFallback from "../../../assets/no-poster.png";
import VideoPopup from "../../../componensts/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
    const{mediaType , id}= useParams();
   const {data, loading } = useFetch(`/${mediaType}/${id}`);
   const {url} = useSelector((state)=>state.home)
    console.log(data);
     console.log(mediaType,id);
    const [show, setShow] = useState(false);
    const [videoId,setVideoId] = useState(null);

    return (
        <div className="detailsBanner">
            {!loading ? (
                <div>
                    <div className="backdrop-img">
                        <Img src={url.backdrop_img_size+data?.backdrop_path}></Img>
                    </div>
                    <div className="opacity-layer"></div>
                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                                {data.poster_path?(
                                    <Img className="posterImg" src={url.backdrop_img_size+data?.poster_path}/>
                                ):(
                                    <Img className="posterImg" src={url.backdrop_img_size+data?.poster_path}/>
                                )}
                            </div>
                            <div className="right">
                                <div className="title">
                                    {`${data?.name || data?.title} (${dayjs(data?.release_date).format("YYYY")})`}
                                </div>
                                <div className="subtitle">
                                    {data?.tagline}
                                </div>
                                <div className="rating">
                                   Rating {data?.vote_average}
                                </div>
                                <div className="playbtn" onClick={()=>{
                                    setShow(true)
                                    setVideoId(video.key)
                                }} >
                                    <PlayIcon/>
                                    <span className="text">
                                        Watch Trailer
                                    </span>
                                    
                                   
                                </div>
                                <div className="overview">
                                    <div className="heading">Overview</div>
                                    <div className="description">{data?.overview}</div>
                                </div>
                                <div className="info">
                                    {data?.status && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                  Status:{" "}
                                            </span>
                                            <span className="text">
                                                {data?.status}
                                            </span>
                                        </div>
                                    )}
                                     {data?.release_date && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                  Release Date:{" "}
                                            </span>
                                            <span className="text">
                                                {dayjs(data?.release_date ).format("MMM D, YYYY ")}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                         
                        </div>
                        <VideoPopup 
                        show={show}
                        setShow={setShow}
                        videoId={videoId}
                        setVideoId={setVideoId}

                        />
                    </ContentWrapper>
                </div>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;