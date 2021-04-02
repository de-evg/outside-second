import * as React from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import styledComponents from "styled-components";
import { ITreeElement } from "../../const";
import Button from "../button/button";
import ChangeForm from "../change-form/change-form";
import { ActionCreator } from "../../store/actions";
import { deleteData } from "../../store/api-actions";

const ListItemComponent = styledComponents.li`
  margin: 0;
  padding: 0;
  padding: 5px 10px;
  padding-right: 0;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styledComponents.div`
  align-self: flex-end;
  display: flex;
  justify-content: space-between;
  width: 170px;
`;

interface IPropsListItem {
  item: ITreeElement
};

// Элемент из списка элементов ветки tree view
const InnerListItem: React.FC<IPropsListItem> = ({ item }) => {
  const { title, main } = item;
  const dispatch = useDispatch();
  const deleteError: {id: string, error: boolean} = useSelector((state: RootStateOrAny) => state.TREE.deleteError);
  const [changeFormShowed, setChangeFormShowed] = React.useState(false);

  const handleDeleteBtnClick = React.useCallback((evt) => {
    dispatch(deleteData(evt.target.id));
    if (deleteError) {
      dispatch(ActionCreator.fetchError({ deleteError: {id: "", error: false} })); 
    }
  }, [dispatch, deleteError]);

  const handleChangeBtnClick = React.useCallback(() => {
    setChangeFormShowed(!changeFormShowed);
  }, [changeFormShowed]);

  return (
    <ListItemComponent>
      {`${title} (main: ${main})`}
      {changeFormShowed
        ? <ChangeForm treeItem={item} changeBtnClickHandler={handleChangeBtnClick} />
        : <Wrapper>
        <Button id={`${item._id}`} clickHandler={handleDeleteBtnClick} isError={deleteError.error && deleteError.id === item._id} text={'Удалить'} />
        <Button id={`${item._id}`} clickHandler={handleChangeBtnClick} text={'Изменить'} />
      </Wrapper>
      }
      
    </ListItemComponent>
  );
};

export default InnerListItem;
