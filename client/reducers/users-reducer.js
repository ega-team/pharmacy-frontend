import { handleActions } from 'redux-actions'

import { FETCH_USERS } from '../types'

export default handleActions({
  [FETCH_USERS]: (state, action) => action.payload,
}, {})
