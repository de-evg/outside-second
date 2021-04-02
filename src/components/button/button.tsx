import * as React from "react";
import styledComponents from "styled-components";

const Btn = styledComponents.button``;

//Реагирует на ошибку запроса
const BtnError = styledComponents(Btn)`

  animation: error 0.6s ease-in;

  @keyframes error {
    25% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(5px);
    }
    75% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(0px);
    }
  }l
`;

interface IPropsButton {
  id?: string,
  clickHandler: (evt?: React.MouseEvent<HTMLButtonElement>) => void,
  text: string,
  isDisabled?: boolean,
  isError?: boolean;
};

const Button: React.FC<IPropsButton> = ({ id, text, clickHandler, isDisabled, isError }) => {
  return (
    isError
      ? <BtnError id={id}  onClick={clickHandler} disabled={isDisabled}>{text}</BtnError>
      : <Btn id={id}  onClick={clickHandler} disabled={isDisabled}>{text}</Btn>
  );
};

export default Button;
