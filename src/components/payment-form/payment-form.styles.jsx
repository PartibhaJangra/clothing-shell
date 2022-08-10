import styled from "styled-components";

import Button from "../button/button.component";

export const PaymentFormContainer = styled.div`
  styled: 300px;
  display: flex;
  flex-direction: column;
  align-elements: center;
  jsutify-content: center;
`;

export const FormContainer = styled.form`
  height: 100px;
  min-width: 500px;
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`;
