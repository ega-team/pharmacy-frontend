import React from 'react'
import Link from 'next/link'
import Web3Container from '../lib/Web3Container'
import { SubmitDropzone } from '../components/Dropzone';

const Accounts = ({ accounts, contract }) => (
    <div>
        <div>source code S</div>
        <SubmitDropzone/>
    </div>
)

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Accounts Page...</div>}
    render={({ accounts, contract }) => <Accounts accounts={accounts} contract={contract}/>}
  />
)
