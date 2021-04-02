import * as React from "react";
import styled from "styled-components";
import InnerListItem from "../inner-list-item/inner-list-item";
import { ITreeElement } from "../../const";

const ListComponent = styled.ul`
  margin: 0;
  padding: 0;
  padding-left: 30px;
  max-width: 100%;
`;

interface IPropsInnerList {
  items: ITreeElement[]
};

// Список элементов внутри ветки tree view
const InnerList: React.FC<IPropsInnerList> = ({ items }) => {
  return (
    <ListComponent>
      {items.map((item: ITreeElement, i: number) => <InnerListItem item={item} key={`${i}-${item._id}`} />)}
    </ListComponent>
  );
};

export default InnerList;
