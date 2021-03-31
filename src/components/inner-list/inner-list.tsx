import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { NameSpace } from "../../store/reducers/root";
import InnerListItem from "../inner-list-item/inner-list-item";

const ListComponent = styled.ul`
  margin: 0;
  padding: 0;
  padding-left: 30px;
`;

interface ITreeElement {
  id: number,
  title: string,
  main: boolean
}

interface IPropsInnerList {
  items: ITreeElement[]
};

const InnerList: React.FC<IPropsInnerList> = ({ items }) => {

  return (
    <ListComponent>
      {items.map((item: ITreeElement, i:number) => <InnerListItem item={item} key={`${i}-${item.id}`} />)}
    </ListComponent>
  );
};

interface ITreeState {
  [tree: string]: {
    [x: string]: IPropsInnerList[]
  }
}

const mapStateToProps = (state: ITreeState) => ({
  tree: state[NameSpace.TREE].tree
});

export default connect(mapStateToProps)(InnerList);
