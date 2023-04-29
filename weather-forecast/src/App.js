import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [data, setData] = useState({})
  const [image, setImage] = useState(null)
  const [location, setLocation] = useState('')
  const apiKeyLocation = 'VISIT https://api.openweathermap.org/';
  const apiKeyImage = `VISIT https://api.unsplash.com/`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKeyLocation}`
  const urlImg = 'https://api.unsplash.com/search/photos/';
  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(url)
        setData(response.data)
        const response2 = await axios.get(urlImg, {
          params: {
            query: location, page: 2, per_page: 2
          },
          headers: {
            Authorization: apiKeyImage
          }
        },
        )
        setImage(response2.data);
      } catch (error) {
        return toast.error(`Something went wrong. ${(error.code.toLowerCase())}`);
      }
    }
  }

  return (
    <div className="app">
      <ToastContainer />
      {image ? <img src={image.results[0].urls.full} className="bg" /> : null}
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{(data.main.temp.toFixed() - 30) / 2}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{(data.main.feels_like.toFixed() - 30) / 2}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;
