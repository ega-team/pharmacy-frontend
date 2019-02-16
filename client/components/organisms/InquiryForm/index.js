import React from "react";
import styled, { css } from "styled-components";
import Text from "../../atoms/Text";
import Input from "../../atoms/Input";
import TextArea from "../../atoms/TextArea";

const StyledInquiryForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  text-align: left;
  width: 500px;
`;

export default function InquiryForm(props) {
  const { handleInput, nameValue, ethValue, titleValue, contentsValue } = props;
  return (
    <StyledInquiryForm>
      <Text text="Name" isMust />
      <Input
        name="name"
        value={nameValue}
        handleInput={handleInput}
        placeholder="First & Last Name"
      />
      <Text type="text" text="Subject" />
      <Input
        name="title"
        value={titleValue}
        handleInput={handleInput}
        placeholder="Subject"
      />
      <Text type="text" text="Eth Price" isMust />
      <Input
        name="email"
        value={ethValue}
        handleInput={handleInput}
        placeholder="eth"
      />
      <Text type="text" text="test" isMust />
      <TextArea
        name="contents"
        value={contentsValue}
        handleInput={handleInput}
        placeholder="test"
      />
    </StyledInquiryForm>
  );
}
