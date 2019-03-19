# next-dapps-boilerplate

Small project that checks the capabilities of next.js

It uses:
- next.js
- redux
- styled-components
- web3.js
- redux-responsive
- custom next.js server

## Setup

Install node.js


### Ethereum

Run `npm install -g truffle`

Run `truffle develop`

ローカルネットに接続する場合はこのときにコンソールに出てくる以下を確認
このホスト:ポートをMetamaskに登録する
```
Truffle Develop started at http://127.0.0.1:9545/
```

Run `compile`

Run `migrate`

`migrate`が動かない場合は
```
migrate --reset
```
さらにnonceをリセットするためにMetamaskプラグインもリセット

#### Ethを補給する
実行アドレスにEthがないとコントラクトを実行できない
```
truffle(develop)> await web3.eth.sendTransaction({from: '0xb76ba113dd8f25(truffle実行時に出てきたアカウントのどれか)', to: '0xeaAc98a1Fd4d226E9EE1（自分のMetamaskのアドレス）', value: web3.utils.toWei('10', 'ether')})
```

### client

Run `cd client`

Run `npm install`

Run `yarn run dev`

Hit `http://localhost:3000`

動かない場合、`build/contracts`を`client/lib/contracts`にコピペしてみてください....


### Ropstenにデプロイ
```
truffle migrate --network ropsten
```

## tutorial
[rantan/meti\-hackathon: Hello, World on Ethereum Blockchain](https://github.com/rantan/meti-hackathon)
