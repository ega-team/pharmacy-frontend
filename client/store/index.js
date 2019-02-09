import { createStore, applyMiddleware, compose } from 'redux'
import {responsiveStoreEnhancer} from 'redux-responsive'

import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

export default initialState => createStore(
  rootReducer,
  initialState,
  compose(
  	responsiveStoreEnhancer,
    applyMiddleware(thunkMiddleware),
  )
)
