import React from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import Web3Container from "../lib/Web3Container";

const Table = styled.table`
  border-collapse: collapse;
  width: 80%;
  border-spacing: 0;
`;

const Top = styled.tr`
  border: solid 1px #eee;
  cursor: pointer;
`;

const Tr = styled.tr`
  border: solid 1px #eee;
  cursor: pointer;
  &:hover {
    background-color: #d4f0fd;
  }
`;

const Th = styled.th`
  text-align: center;
  width: 25%;
  padding: 15px 0;
`;

const Td = styled.td`
  text-align: center;
  width: 25%;
  padding: 15px 0;
`;

const Accounts = ({ accounts, contract }) => (
  <div>
    <h1>問題一覧</h1>
    <Table>
      <Top>
        <Th>報酬</Th>
        <Th>仕様</Th>
        <Th>データ</Th>
      </Top>
      <Tr>
        <Td>{0.5}Eth</Td>
        <Td>hogehoge</Td>
        <Td>hogehoge</Td>
      </Tr>
      <Tr>
        <Td>{0.5}Eth</Td>
        <Td>hogehoge</Td>
        <Td>hogehoge</Td>
      </Tr>
      <Tr>
        <Td>{0.5}Eth</Td>
        <Td>hogehoge</Td>
        <Td>hogehoge</Td>
      </Tr>
    </Table>
  </div>
);

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Accounts Page...</div>}
    render={({ accounts, contract }) => (
      <Accounts accounts={accounts} contract={contract} />
    )}
  />
);
