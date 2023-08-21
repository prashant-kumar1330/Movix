import React from 'react'
import "./style.scss"
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from './vedioSection/VedioSection'
const Details = () => {
  const{mediaType , id}= useParams();
  const {data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const{data: credit , loading:creditLoading}= useFetch(`/${mediaType}/${id}/credits`);
  console.log(data);
  console.log(mediaType,id);
  return (

    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credit?.crew}/>
      <Cast data ={credit?.cast} loading={creditLoading}/>
      <VideosSection data ={data} loading={loading}/>
    </div>
  )
}

export default Details