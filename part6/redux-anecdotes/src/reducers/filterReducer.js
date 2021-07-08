const initialState = {
  term: '',
  //results: null
}

export const manageFilter = input => {
  return {
    type: 'CHANGE',
    input: input
  }
}

/*
export const setFilterResults = results => {
  return {
    type: 'SET',
    results: results
  }
}
*/

const filterReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE':
      return {
        term: action.input,
        //results: null
      }
      /*
    case 'SET':
      return {
        term: action.input,
        results: action.results
      }
      */
    default:
      return state
  }
}

export default filterReducer
