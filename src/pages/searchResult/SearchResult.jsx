import React, { useEffect, useState } from 'react'
import "./style.scss"
import InfiniteScroll from 'react-infinite-scroll-component'
import ContentWrapper from '../../componensts/contentWrapper/ContentWrapper'
import { fetchDataFromApi } from '../../utils/api'
import { useParams } from 'react-router-dom'
import MovieCard from '../../componensts/movieCard/MovieCard'


const SearchResult = () => {

  const [data, setData] = useState(null);
  const [pageNum,setPageNum] = useState(1);
  const [loading, setLoading]= useState(false);
  const {query}= useParams();




  const fetchInitialData = ()=>{

     setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
      setData(res)
      setPageNum((pageNum)=> pageNum+1)
      setLoading(false);
    })

  }


  useEffect(()=>{
       fetchInitialData();
  },[query])

  console.log(data);

const fetchNextPageData =()=>{
  
  setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
      if(data?.results){
        setData({...data, results:[...data?.results , ...res?.results]})
      }
      else{
        setData(res);
      }
    
      setPageNum((pageNum)=> pageNum+1)
      setLoading(false);
    })
}




  return (
    <div className="searchResultsPage">
      {loading && (<span>Loading....</span>)}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length>0?(
            <>
            <div className="pageTitle">
               {`Search results of ${query}`}
            </div>
            <InfiniteScroll
            className='content'
            dataLength={data?.results?.length || []}
            next={fetchNextPageData}
            hasMore= {pageNum<=data?.total_pages}
            >
              {data?.results.map((item,index)=>{
             
                
                return(
                 <MovieCard key={index} data={item} mediaType={item.media_type}/>
                )
                
              })}
            </InfiniteScroll>
            </>
          ):(
            <span className='resultNotFound'>
    Sorry, Results not Found!
            </span>
       
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult