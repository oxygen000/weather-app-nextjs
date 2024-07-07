"use client" 
import React from 'react'
import Image from 'next/image'
import './home.css'
import {useState} from 'react'
import axios from 'axios';


function Home() {
  const [city,setCity] = useState("")
  const [weather,setWeather] = useState({})
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState ("") 

  const getWeatherData = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`);
      if (res?.data?.cod === 200) {
        setWeather(res.data);
        setError("");
      } else {
        setError("error while fetching data");
      }
    } catch (err) {
      setError(err?.response?.data.message);
      setWeather({});
      setIsLoading(false);
    }
    
  };

  return (
    <>
    <main className='w-screen h-screen relative flex items-center justify-center px-4 py-4 lg:px-[10rem]'>
    <div className='w-[500px] h-[300px] bg-[rgba(255,255,255,0.4)] border-2 border-[rgba(255,255,255,0.4)] backdrop-blur text-white rounded-xl p-4 flex flex-col items-center'>
      <h1 className='text-center text-black text-xl mb-4 font-semibold'>Get weather information by city name</h1>
      <form onSubmit={getWeatherData}>
      <input type="text" required className='px-4 py-2 text-black rounded-lg outline-none focus:ring focus:ring-[#242424]' value={city} onChange={(e) => setCity(e.target.value)}/>
      <button type='submit' className={`bg-[#242424] px-4 py-2 rounded-lg ml-2 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
      disabled={isLoading}>submit</button>
      </form>
      {
        weather?.cod == 200 && (
          <div className='w-full grid grid-cols-[170px,1fr] 
          items-center mt-2'>
            <div className='grid justify-center '>
            <Image src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt='icon' width={100} height={70} />
            <p className='text-center text-xs'>{weather?.weather[0].main}</p>
            </div>
            <div className='text-black '>
              <p className='text-xl front-semibold mb-2 '>{weather.name}</p>
              <p>temp : {weather?.main.temp}&deg;C</p>
              <p> humidty :  {weather?.main.humidity}</p>
              <p> desc :  {weather?.weather[0].description}</p>
            </div>
          </div>
        )
      }
      {error && <p className='text-center text-lg text-black mt-2 font-semibold'>{error}</p>}
    </div>
    
    </main>
    </>
  )
}


export default Home