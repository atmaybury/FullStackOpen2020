import React from 'react'

const Filter = ({ handleSearchInput, value }) => {
  return(
    <>
      Search: <input value={value} onChange={handleSearchInput} />
    </>
  )
}

export default Filter
