import * as React from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteData } from "../../store/api-actions";
import Button from "../button/button";
import { ITreeElement } from "../../const";
import ChangeForm from "../change-form/change-form";

const ListItemComponent = styled.li`
  margin: 0;
  padding: 0;
  padding: 5px 10px;
  padding-right: 0;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  align-self: flex-end;
`;


interface IPropsListItem {
  item: ITreeElement
};

const InnerListItem: React.FC<IPropsListItem> = ({ item }) => {
  const { title, main } = item;
  const dispatch = useDispatch();
  const isDeleteError = useSelector((state: RootStateOrAny) => state.isDeleteError);
  const [changeFormShowed, setChangeFormShowed] = React.useState(false);

  const handleDeleteBtnClick = React.useCallback((evt) => {
    dispatch(deleteData(evt.target.id));
  }, [dispatch]);


  const handleChangeBtnClick = React.useCallback(() => {
    setChangeFormShowed(!changeFormShowed);
  }, [changeFormShowed]);

  React.useEffect(() => {
    if (isDeleteError) {
      console.log('delete error')
    }
  }, [item, dispatch, isDeleteError]);

  return (
    <ListItemComponent>
      {`${title} (main: ${main})`}
      {changeFormShowed
        ? <ChangeForm treeItem={item} changeBtnClickHandler={handleChangeBtnClick} />
        : <Wrapper>
        <Button id={`${item._id}`} clickHandler={handleDeleteBtnClick} text={'Удалить'} />
        <Button dataName={item.title} id={`${item._id}`} clickHandler={handleChangeBtnClick} text={'Изменить'} />
      </Wrapper>
      }
      
    </ListItemComponent>
  );
};

export default InnerListItem;
