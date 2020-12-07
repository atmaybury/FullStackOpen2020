import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ShowCountryButton from './components/ShowCountryButton'
import CountryDisplay from './components/CountryDisplay'
import Weather from './components/Weather'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ query, setQuery ] = useState('')
  const [ results, setResults ] = useState([])
  const [ tooMany, setTooMany ] = useState(false)
  const [ weather, setWeather] = useState({ weather_icons: ['./../public/logo192.png'] })

  // get initial data
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  // track user input and update query state
  const handleInput = (event) => {
    setQuery(event.target.value)
  }
  
  // check content of query against countries
  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().includes(query.toLowerCase())
    })
    setTooMany(result.length > 10 ? true : false)
    setResults(result)
  }, [query, countries])
  
  // show single country
  const seeCountry = (country) => {
    setResults([country])
  }

  // get weather if result narrowed to 1
  useEffect(() => {
    // weather information for country
    const getWeather = (city) => {
      const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY
      axios.get(`http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${city}`)
      .then(response => {
        // successful API call
        if (response.data['current']) {
          setWeather(response.data['current'])
        // failed API call
        } else {
          setWeather('unavailable')
          console.log(response.data['error'].info)
        }
      })
    }

    if (results.length === 1) {
      getWeather(results[0].capital)
    }
  }, [results])

  // RENDER //

  // if more than 10 results
  if (tooMany === true) {
    return(
      <>
        find countries: <input onChange={handleInput} />
        <div>Too many results</div>
      </>
    )
  }
  
  // if single result
  if (results.length === 1) {
    const country = results[0]
    return(
      <>
        find countries: <input onChange={handleInput} />
        <CountryDisplay country={country} />
        <Weather city={country.capital} weather={weather} />
      </>
    )
  }

  // else list results
  return(
    <>
      find countries: <input onChange={handleInput} />
      <ul>
        {results.map((result, i) => <li key={i}>{result.name} <ShowCountryButton handleClick={seeCountry} country={result} /></li>)}
      </ul>
    </>
  );
}

export default App;
