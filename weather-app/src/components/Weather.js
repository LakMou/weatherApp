import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Img from './sky.png';


const Weather =()=>{
    const WEATHER_BASE_URL ="http://api.openweathermap.org/data/2.5/weather?q="
    const API_KEY="fea4c23781be9b16d29e7f4b6b4537d4"
const [input , setInput]=useState("")
const [data , setData]=useState(null)
const [loading , setLoading]=useState(true)
const fetchWeather = async (city)=>{
const url = `${WEATHER_BASE_URL}${city}&APPID=${API_KEY}`
try {
const response = await axios.get(url)
if (response.status===200){
    console.log("response:", response.data)
    setData(response.data)
}
}
catch(error){setData(null)
            console.log("Error :",error)
}

}

useEffect(()=>{fetchWeather("Algeirs")})
return(
<div className="weather-card">
<div className="searchBar" >
<input className="Input" placeholder="enter the country" onChange = {(e)=>{setInput(e.target.value)}}/>
<button className="SearchBtn" onClick={()=>{fetchWeather(input)}}>Search</button>
</div>
<img src={Img} height="150" width="150" alt="weather" />
<div>
                { loading ?("loading"):(
                    <div>
                    data ? (
                    <div>
                        <div className="city">{data.name}</div>
                        <div className="weather-infos"> 
                            <div className="row"> 
                                <div className="info-title">Temerature</div>
                                <div className="info-title">Weather</div>
                                <div className="info-title">Wind</div>
                            </div>
                            <div className="row"> 
                                <div className="info">{`${Math.round(data.main.temp - 273.15)}`}</div>
                                <div className="info"> {data.weather[0].description}  </div>
                                <div className="info"> {`${data.wind.speed}KM/h`}   </div>
                            </div>
                        </div>
                    </div>  
                ): (
                    "No available Data to Display"
                ) </div>)}
            </div>



</div>


)
}
export default Weather;