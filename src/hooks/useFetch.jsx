import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../utils/api';
const useFetch = (url) => {
  
    const[data,setData] = useState("");
    const[loading, setLoading]= useState("");
    const [error,setError] = useState("");


    useEffect(()=>{
        setData(null);
        setError(null);
        setLoading("Loading....")

      console.log("helo from fetch")
        fetchDataFromApi(url)
        .then((res)=>{
            setLoading(false)
           setData(res);
        })
        .catch((err)=>{
            setLoading(false);
            setError("Something went wrong!...")
             console.log(err);
        })
    },[url])
  
 return {data,error,loading}

}

export default useFetch