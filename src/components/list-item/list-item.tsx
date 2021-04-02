import * as React from "react";
import styled from "styled-components";
import InnerList from "../inner-list/inner-list";
import { ITreeElement } from "../../const";

const MAX_SHOWED_ROWS = 5;

const ListItemComponent = styled.li`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const BranchHead = styled.button`
  padding: 5px;
  width: 100%;
  text-align: left;
  border: none;
  display: flex;
  justify-content: space-between;
`

interface IPropsListItem {
  branchName: string,
  items: ITreeElement[]
};

// Элемент списка веток tree view - ветка tree view
const ListItem: React.FC<IPropsListItem> = ({branchName, items}) => {
  const [isOpened, setOpened] = React.useState<boolean>(false);
  const [filteredItems, setFiltereditems] = React.useState<ITreeElement[] | []>([]);

  const clickHandler = React.useCallback(() => {
    setOpened(!isOpened);
  }, [isOpened]);

  React.useEffect(() => {
    if (!!items) {
      const newFilterdItems = items.filter((item) => item.main);
      if (newFilterdItems.length) {
        setFiltereditems(newFilterdItems.slice(0, MAX_SHOWED_ROWS));
      } else {
        setFiltereditems(items.slice(0, MAX_SHOWED_ROWS));
      }
    }
  }, [items])

  return (
    !!items 
    ? <ListItemComponent>
      <BranchHead onClick={clickHandler}><span>{isOpened ? `-` : `+`} {branchName}</span> <span>Всего: {items.length}</span></BranchHead>
      {!isOpened && !!filteredItems.length && <InnerList items={filteredItems} />}
      {isOpened && <InnerList items={items} />}
    </ListItemComponent> 
    : null
  );
};

export default ListItem;
