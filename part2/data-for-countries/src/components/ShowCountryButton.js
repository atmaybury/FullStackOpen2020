import React from 'react'

const ShowCountryButton = ({ handleClick, country }) => {    
  return(    
    <button onClick={() => handleClick(country)}>show</button>    
  )    
}    

export default ShowCountryButton
