import * as React from "react";
import { connect, RootStateOrAny } from "react-redux";
import styled from "styled-components";
import { NameSpace } from "../../store/reducers/root";
import ListItem from "../list-item/list-item";
import { ITreeElement, SortType } from "../../const";

const ListComponent = styled.ul`
  margin: 0;
  padding: 0;
`;

interface IPropsList {
  tree: {[branchName: string]: ITreeElement[]},
  sortType: string
};

// Список веток tree view
const List: React.FC<IPropsList> = ({ tree, sortType }) => {
  const [listKeys, setListKeys] = React.useState<string[] | []>([]);

  React.useEffect(() => {
    if (sortType === SortType.AZ) {
      setListKeys(Object.keys(tree).sort((titleA: string, titleB: string) => titleA.toLowerCase() > titleB.toLowerCase() ? 1 : -1));
    } else {
      setListKeys(Object.keys(tree).sort((titleA: string, titleB: string) => titleA.toLowerCase() < titleB.toLowerCase() ? 1 : -1));
    }
  }, [tree, sortType]);

  return (
    <ListComponent>
      {listKeys.map((branchName: string, i: number) => <ListItem branchName={branchName} items={tree[branchName]} key={`${i}-${branchName}`} />)}
    </ListComponent>
  );
};
  
const mapStateToProps = (state: RootStateOrAny) => ({
  tree: state[NameSpace.TREE].tree,
  sortType: state[NameSpace.TREE].sortType
});

export default connect(mapStateToProps)(List);
