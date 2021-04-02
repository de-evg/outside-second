import * as React from "react";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import styledComponents from "styled-components";
import Button from "../button/button";
import { updateData } from "../../store/api-actions";
import { ITreeElement } from "../../const";
import { ActionCreator } from "../../store/actions";

const Form = styledComponents.form`
  display: flex;
  flex-direction column;
`;
const TextInput = styledComponents.input`
`;
const InputLabel = styledComponents.label``;
const SelectInput = styledComponents.select``;

interface IChangeForma {
  treeItem: ITreeElement,
  changeBtnClickHandler: () => void
};

//Форма изменения элемента (title или main)
const ChangeForm: React.FC<IChangeForma> = ({ treeItem, changeBtnClickHandler }: IChangeForma) => {
  interface IFormData {
    title: string,
    main: boolean
  };
  const { title, main } = treeItem;
  const [formData, setFormData] = React.useState<IFormData>({ title, main });
  const dispatch = useDispatch();
  const updateError: {id: string, error: boolean} = useSelector((state: RootStateOrAny) => state.TREE.updateError);

  const handleInputChange = React.useCallback((evt) => {
    let { value } = evt.target;
    if (evt.target.id === "main") {
      value = value === "TRUE" ? true : false;
    }
    setFormData({ ...formData, [evt.target.id]: value })
  }, [formData])

  const handleClick = React.useCallback((evt) => {
    evt.preventDefault();
    dispatch(updateData(treeItem._id, formData));
    if (updateError.error) {
      dispatch(ActionCreator.fetchError({ updateError: {id: "", error: false} }));
      return;
    }
    changeBtnClickHandler();
  }, [dispatch, formData, treeItem, changeBtnClickHandler, updateError]);

  return (
    <Form>
      <InputLabel htmlFor="title">Title</InputLabel>
      <TextInput onChange={handleInputChange} value={formData.title} type="text" id="title" />

      <InputLabel htmlFor="main">Main</InputLabel>
      <SelectInput defaultValue={`${formData.main}`} onChange={handleInputChange} id="main">
      <option value={"SELECT"}>Select</option>
        <option value={"TRUE"}>True</option>
        <option value={"FALSE"}>False</option>
      </SelectInput>

      <Button id={"Submit"} clickHandler={handleClick} isError={updateError.error && updateError.id === treeItem._id} text={"Изменить"}></Button>
    </Form>
  );
};

export default ChangeForm;
