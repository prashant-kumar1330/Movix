
import './App.css'

import { BrowserRouter,Routes,Route } from 'react-router-dom'

import Header from './componensts/header/Header'
import Footer from './componensts/footer/Footer'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SearchResult from './pages/searchResult/SearchResult'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/PageNotFound'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchDataFromApi } from './utils/api'
import { setApiConfiguration } from './store/homeSlice'


function App() {
   const dispatch = useDispatch();

   useEffect(()=>{
       apiConfig();
   },[])

  const apiConfig = ()=>{
    fetchDataFromApi("/configuration")
    .then((res)=>{
     const configuration_data = {
      backdrop_img_size : res?.images?.base_url + "original",
      poster_img_size:  res?.images?.base_url + "original",
      profile_img_size:  res?.images?.base_url + "original"
     }
      dispatch(setApiConfiguration(configuration_data))
    })
    .catch(()=>{
      console.log("something went wrong while fetching API config")
    })
  }
   

  return (
     <BrowserRouter>
     <Header/>
       <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/:mediaType/:id' element={<Details/>}></Route>
        <Route path='/search/:query' element={<SearchResult/>}></Route>
        <Route path='/explore/:mediaType' element={<Explore/>}></Route>
        <Route path='*' element={<PageNotFound/>}></Route>
       </Routes>
       <Footer/>
     </BrowserRouter>
  )

}

export default App
