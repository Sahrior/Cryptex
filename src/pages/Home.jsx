import React, { useEffect, useState } from 'react'
import { fetchCryptos } from '../API/coinGecko'
import CryptoCard from '../components/CryptoCard'


const Home = () => {

    const pew_pew = ()=>{}

    

    const [cryptoList, setCryptoList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [viewMode, setViewMode] = useState("grid")

    useEffect(()=>{
        fetchCryptoData();
    }, [])

    const fetchCryptoData = async () => {
        try {
            const data = await fetchCryptos();
            //console.log(data)
            setCryptoList(data)
        } catch (error) {
            console.error("Error fetching crypto: ", err)
        }finally{
            setIsLoading(false)
        }
    }


  return (
    <div className="app">


        <div className="controls">


            <div className="filter-group">
                <label>Sort by: </label>
                <select>
                    
                </select>
            </div>


            <div className="view-toggle">
                <button className= {viewMode==="grid" ? "active" : "" } onClick={()=>setViewMode("grid")} >Grid</button>
                <button className= {viewMode==="list" ? "active" : "" } onClick={()=>setViewMode("list")} >List</button>
            </div>
        </div>


        { isLoading? (

            <div className='loading' >
                <div className="spinner"></div>
                <p>loading crypto data</p>
            </div>

        ) :  (

            <div className={`crypto-container ${viewMode} `} >
                {cryptoList.map((crypto, key) =>(
                    <CryptoCard crypto={crypto} key={key} />
                ) )}
            </div>

        ) }
    </div>
  )
}

export default Home
