import { combineReducers } from 'redux'
import {createResponsiveStateReducer} from 'redux-responsive'

import users from './users-reducer'

const rootReducer = combineReducers({
  users,
  browser: createResponsiveStateReducer({
    phone: 400, 
    tablet: 800,
    desktop: 1200,
  }, {infinity: 'desktop', initialMediaType: 'desktop'}),
})

export default rootReducer
