import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { NameSpace } from "../../store/reducers/root";
import ListItem from "../list-item/list-item";

const ListComponent = styled.ul`
  margin: 0;
  padding: 0;
`;

interface ITreeElement {
  id: number,
  title: string,
  main: boolean
}

interface IPropsList {
  [tree: string] : {
    [branchName: string]: ITreeElement[]
  }  
};

const List: React.FC<IPropsList> = ({ tree }) => {
  const [listKeys, setListKeys] = React.useState<string[] | []>([]);

  React.useEffect(() => {
    if (tree) {
      setListKeys(Object.keys(tree));
    }
  }, [tree]);

  return (
    <ListComponent>
      {listKeys.map((branchName: string, i:number) => <ListItem branchName={branchName} items={tree[branchName]} key={`${i}-${branchName}`} />)}
    </ListComponent>
  );
};

interface ITreeState {
  [tree: string]: {
    [x: string]: IPropsList[]
  }
}

const mapStateToProps = (state: ITreeState) => ({
  tree: state[NameSpace.TREE].tree
});

export default connect(mapStateToProps)(List);
