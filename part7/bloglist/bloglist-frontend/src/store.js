import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  user: loginReducer,
  users: userReducer,
  blogs: blogReducer,
  notification: notificationReducer
})

const rootReducer = (state, action) => {
  switch(action.type) {
    case 'LOGOUT':
      return reducer(undefined, action)
    default:
      return reducer(state, action)
  }
}

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
