// https://github.com/zalmoxisus/redux-devtools-extension
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import { request } from '../utils'

const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: true
})
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ request }), logger))
)
export default store
