import { createAction } from 'redux-actions'
import axios from 'axios'

import { FETCH_USERS } from '../types'

const fetchUsersAction = createAction(FETCH_USERS)

export const fetchUsers = payload => async dispatch => {
  const users = await axios.get('https://jsonplaceholder.typicode.com/users')
  dispatch(fetchUsersAction(users.data))
}
