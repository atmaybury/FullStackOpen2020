const initialState = {
  term: '',
}

export const manageFilter = input => {
  return {
    type: 'CHANGE',
    input: input
  }
}

const filterReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE':
      return {
        term: action.input,
      }
    default:
      return state
  }
}

export default filterReducer
