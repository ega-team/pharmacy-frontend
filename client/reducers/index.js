import { combineReducers } from 'redux'
import {createResponsiveStateReducer} from 'redux-responsive'

import users from './users-reducer'
import ui from './ui'

const rootReducer = combineReducers({
  users,
  ui,
  browser: createResponsiveStateReducer({
    phone: 400, 
    tablet: 800,
    desktop: 1200,
  }, {infinity: 'desktop', initialMediaType: 'desktop'}),
})

export default rootReducer
