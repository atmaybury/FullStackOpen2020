import React from 'react'
import { connect } from 'react-redux'
import { addVote } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = props => {

  const vote = anecdote => {
    props.addVote(anecdote)
    props.notify(`You voted '${anecdote.content}'`, 5)
  }

  return(
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {props.anecdotes
        .filter(a => a.content.toLowerCase().includes(props.filter.toLowerCase()))
        .sort((a, b) => (b.votes > a.votes) ? 1 : -1)
        .map(anecdote => 
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
    )
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter.term
  }
}

export default connect(
  mapStateToProps,
  { addVote, notify }
)(AnecdoteList)
