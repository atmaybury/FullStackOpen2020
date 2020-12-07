import React from 'react'

const Weather = ({ city, weather }) => {
  if (weather !== 'unavailable') {
    console.log(weather.weather_icons)
    return(
      <>
        <p><strong>Weather in {city}</strong></p>
        <p>temperature: {weather.temperature}</p>
        <img src={weather.weather_icons[0]} alt='Weather icon' />
        <p>wind: {weather.wind_speed}kph direction: {weather.wind_dir}</p>
      </>
    )
  } else {
    return(
      <p>Weather unavailable</p>
    )
  }
}

export default Weather
