import * as React from "react";
import styled from "styled-components";

const ListItemComponent = styled.li`
  margin: 0;
  padding: 0;
  padding: 5px 10px;
  width: 150px;
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  margin-left: 10px;
  width: 15px;
  height: 15px;
`

interface ITreeElement {
  id: number,
  title: string,
  main: boolean
}

interface IPropsListItem {
  item: ITreeElement
};

const InnerListItem: React.FC<IPropsListItem> = ({item}) => {
  const {title, main} = item;

  return (
    <ListItemComponent>
      {`${title} (main: ${main})`}
      <DeleteButton />
    </ListItemComponent>
  );
};

export default InnerListItem;
