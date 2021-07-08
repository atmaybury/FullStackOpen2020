import React from 'react'
import { connect } from 'react-redux'
import { manageFilter } from './../reducers/filterReducer'

const Filter = props => {

  const style = {
    marginBottom: 10
  }

  const handleChange = e => {
    props.manageFilter(e.target.value)
  }

  return(
    <div style={style}>
      Filter: <input onChange={handleChange} />
    </div>
  )
}

export default connect(
  null,
  { manageFilter }
)(Filter)
