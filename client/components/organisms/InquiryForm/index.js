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
      <Text type="text" text="Verification items" />
      <Input
        name="title"
        value={titleValue}
        handleInput={handleInput}
        placeholder="BMI"
      />
      <Text type="text" text="Wei Price" isMust />
      <Input
        name="email"
        value={ethValue}
        handleInput={handleInput}
        placeholder="wei price"
      />
      <Text type="text" text="Specification" isMust />
      <TextArea
        name="contents"
        value={contentsValue}
        handleInput={handleInput}
        placeholder="specification"
      />
    </StyledInquiryForm>
  );
}
