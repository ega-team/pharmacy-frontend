import React from "react";
import Link from "next/link";
import { Provider } from "react-redux";
import Web3Container from "../lib/Web3Container";
import { SubmitProblem } from "../components/SubmitProblem";
// import { SubmitDropzone } from '../components/Dropzone';

class Accounts extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // ここにaccoutとcontractが入ってくる
    const { accounts, contract } = this.props;
    return (
      <div>
        <div>source code S</div>
        <SubmitProblem />
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
