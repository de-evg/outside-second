import * as React from "react";
import styled from "styled-components";
import InnerList from "../inner-list/inner-list";

const ListItemComponent = styled.li`
  margin: 0;
  padding: 0;
`;

const BranchHead = styled.button`
  width: 150px;
`

interface ITreeElement {
  id: number,
  title: string,
  main: boolean
}

interface IPropsListItem {
  branchName: string,
  items: ITreeElement[]
};

const ListItem: React.FC<IPropsListItem> = ({branchName, items}) => {
  const [isOpened, setOpened] = React.useState<boolean>(false);

  const clickHandler = React.useCallback(() => {
    setOpened(!isOpened);
  }, [isOpened]);

  return (
    <ListItemComponent>
      <BranchHead onClick={clickHandler}>{isOpened ? `-` : `+`} {branchName} ({items.length})</BranchHead>
      {isOpened && <InnerList items={items} />}
    </ListItemComponent>
  );
};

export default ListItem;
