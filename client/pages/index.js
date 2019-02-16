import React, {Component} from 'react'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'

import makeStore from '../store'
import { fetchUsers } from '../actions/users-actions'

class Users extends Component {
  
  static async getInitialProps({store, pathname, query}) {
    await store.dispatch(fetchUsers())
  }

  render() {
  	const { users, browser } = this.props
  	return(
      <div>
      <div>Next.js</div>
      <div><Link href='/accounts'><a>My Accounts</a></Link></div>
      <div><Link href='/submit'><a>Submit</a></Link></div>
      </div>
  	)
  }
}

const mapStateToProps = state => ({users: state.users, browser: state.browser})

export default withRedux( makeStore, mapStateToProps )(Users)
