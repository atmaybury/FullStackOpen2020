import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const button = type => {
    store.dispatch({
      type: type
    })
  }
  
  return (
    <div>
      <button onClick={() => button('GOOD')}>good</button> 
      <button onClick={() => button('OK')}>ok</button> 
      <button onClick={() => button('BAD')}>bad</button> 
      <button onClick={() => button('ZERO')}>reset stats</button> 
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
