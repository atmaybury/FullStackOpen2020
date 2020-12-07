import React from 'react'

const CountryDisplay = ({ country }) => {
  return(
    <>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population : {country.population}</p>
      <h4>Languages:</h4>
      <ul>
        {country.languages.map((language, i) => <li key={i}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width='150' alt='Flag' />
    </>
  )
}

export default CountryDisplay
