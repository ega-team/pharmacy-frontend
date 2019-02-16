import React from "react";
import Link from "next/link";
import Web3Container from "../lib/Web3Container";
import { SubmitAnswer } from "../components/SubmitAnswer";

class Accounts extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // ここにaccoutとcontractが入ってくる
    const { accounts, contract } = this.props;
    return (
      <div>
        <div>回答を送信 ID':hoge'</div>
        <SubmitAnswer dataId={'hoge'}/>
      </div>
    );
  }
}

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Accounts Page...</div>}
    render={({ accounts, contract }) => (
      <Accounts accounts={accounts} contract={contract} />
    )}
  />
);
