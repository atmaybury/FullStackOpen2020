import React, {useState, useEffect} from 'react'; import ReactDOM from 'react-dom';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ handleClick, text }) => {                                    
  return(                                    
    <button onClick={handleClick}>{text}</button>
  )                                    
}

const App = () => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [highest, setHighest] = useState(0)

  useEffect(() => {
    let maxIndex = 0
    for (let i=0; i<votes.length; i++) {
      if (votes[i] > votes[maxIndex]) {
        maxIndex = i
      }
    }
    setHighest(maxIndex)
  }, [votes])

  const nextAnecdote = () => {
    let rand = Math.floor(Math.random() * anecdotes.length)
    setSelected(rand)
  }
  
  const vote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return(
    <>
      <p><strong>Anecdote of the day</strong></p>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes.</p>
      <Button handleClick={vote} text='Vote' />
      <Button handleClick={nextAnecdote} text='Next anecdote' />
      <p><strong>Anecdote with most votes</strong></p>
      <p>{anecdotes[highest]}</p>
    </>
  )
}

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
