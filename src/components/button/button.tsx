import * as React from "react";
import styled from "styled-components";

const Btn = styled.button`
  
`;

interface IPropsButton {
  id?: string,
  clickHandler: (evt: any) => void,
  text: string,
  dataName?: string
};

const Button: React.FC<IPropsButton> = ({id, text, clickHandler, dataName}) => {
  return (
      <Btn id={id} data-name={dataName} onClick={clickHandler} >{text}</Btn>
  );
};

export default Button;
