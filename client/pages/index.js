import React, { Component } from "react";
import withRedux from "next-redux-wrapper";
import Link from "next/link";
import styled, { css, injectGlobal } from "styled-components";
import makeStore from "../store";
import { fetchUsers } from "../actions/users-actions";

injectGlobal`
  html, body {
    height: 100%;
    width: 100%;
    background-color: rgb(27, 27, 27);
    font-family: sans-serif;
  }
  body {
    margin: 0;
  }
`;

class Users extends Component {
  static async getInitialProps({ store, pathname, query }) {
    await store.dispatch(fetchUsers());
  }

  render() {
    const { users, browser } = this.props;
    return (
      <div>
        <div>Next.js</div>
        <div>
          <Link href="/accounts">
            <a>My Accounts</a>
          </Link>
        </div>
        <div>
          <Link href="/submit">
            <a>Submit</a>
          </Link>
        </div>
        <div>
          <Link href="/list">
            <a>List</a>
          </Link>
        </div>
        <div>
          <Link href="/submitHost">
            <a>Submit Host</a>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  browser: state.browser
});

export default withRedux(makeStore, mapStateToProps)(Users);
