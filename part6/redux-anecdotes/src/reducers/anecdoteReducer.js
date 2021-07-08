import anecdoteService from './../services/anecdotes'

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const addVote = anecdote => {
  return async dispatch => {
    const response = await anecdoteService.vote(anecdote)
    console.log(response)
    dispatch({
      type: 'VOTE',
      updated: response
    })
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const response = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      new: response
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      return state.map(a => a.id === action.updated.id ? action.updated : a)
    case 'NEW_NOTE':
      return [ ...state, action.new ]
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer
