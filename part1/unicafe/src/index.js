import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Button = ({ handleClick, text }) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({ text, value }) => {
  return(
    <>
      <td>{text}:</td><td>{value}</td>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  // test whether any input has been recieved
  if (good + neutral + bad === 0) {
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <table>
      <tbody>
        <tr><Statistic text="Good" value={good} /></tr>
        <tr><Statistic text="Neutral" value={neutral} /></tr>
        <tr><Statistic text="Bad" value={bad} /></tr>
        <tr><Statistic text="All" value={good + neutral + bad} /></tr>
        <tr><Statistic text="Average"  value={(good - bad) / (good + neutral + bad)} /></tr>
        <tr><Statistic text="Positive" value={good / (good + neutral + bad) * 100  + '%'} /></tr>
      </tbody>
    </table>
  )
}

  const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const badClick = () => {
      setBad(bad + 1)
    }

    const neutralClick = () => {
      setNeutral(neutral + 1)
    }

    const goodClick = () => {
      setGood(good + 1)
    }

    return(
      <div>
        <p><strong>GIVE FEEDBACK</strong></p>
        <Button handleClick={badClick} text='BAD' />
        <Button handleClick={neutralClick} text='NEUTRAL' />
        <Button handleClick={goodClick} text='GOOD' />
        <p><strong>STATISTICS</strong></p>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    )
  }

  ReactDOM.render(<App />, document.getElementById('root'))
