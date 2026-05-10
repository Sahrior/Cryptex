import React, { useEffect, useState } from 'react'
import { fetchCryptos } from '../API/coinGecko'
import CryptoCard from '../components/CryptoCard'


const Home = () => {

    

    const [cryptoList, setCryptoList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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
        { isLoading? (

            <div className='loading' >
                <div className="spinner"></div>
                <p>loading crypto data</p>
            </div>

        ) :  (

            <div className='crypto-container' >
                {cryptoList.map((crypto, key) =>(
                    <CryptoCard/>
                ) )}
            </div>

        ) }
    </div>
  )
}

export default Home
