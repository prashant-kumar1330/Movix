import React from 'react'
import "./style.scss"
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailsBanner/DetailsBanner'
const Details = () => {
  const{mediaType , id}= useParams();
  const {data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const{data: credit , loading:creditLoading}= useFetch(`/${mediaType}/${id}/credits`);
  console.log(data);
  console.log(mediaType,id);
  return (

    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credit?.crew}/>
    </div>
  )
}

export default Details