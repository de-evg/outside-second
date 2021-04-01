import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { NameSpace } from "../../store/reducers/root";
import ListItem from "../list-item/list-item";
import { ITreeElement } from "../../const";

const ListComponent = styled.ul`
  margin: 0;
  padding: 0;
`;


interface IPropsList {
  [tree: string]: {
    [branchName: string]: ITreeElement[]
  }
};

const List: React.FC<IPropsList> = ({ tree }) => {
  const [listKeys, setListKeys] = React.useState<string[] | []>([]);

  React.useEffect(() => {
    setListKeys(Object.keys(tree).sort((titleA: string, titleB: string) => titleA.toUpperCase() > titleB.toUpperCase() ? 1 : -1));
  }, [tree]);

  return (
    <ListComponent>
      {listKeys.map((branchName: string, i: number) => <ListItem branchName={branchName} items={tree[branchName]} key={`${i}-${branchName}`} />)}
    </ListComponent>
  );
};

interface ITreeState {
  [tree: string]: {
    [x: string]: IPropsList[]
  }
};

const mapStateToProps = (state: ITreeState) => ({
  tree: state[NameSpace.TREE].tree
});

export default connect(mapStateToProps)(List);
