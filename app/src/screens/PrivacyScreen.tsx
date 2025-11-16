import React from "react";
import { ScreenContainer } from "../components/ScreenContainer";
import { Title, Body } from "../components/Typography";

export const PrivacyScreen = () => {
  return (
    <ScreenContainer>
      <Title>Your data is protected</Title>
      <Body>
        • Your prescriptions and profile are encrypted.
        {"\n"}• We never share your data.
        {"\n"}• You control what is stored or deleted.
      </Body>
    </ScreenContainer>
  );
};

export default PrivacyScreen;
