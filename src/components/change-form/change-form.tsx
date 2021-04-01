import * as React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../button/button";
import { updateData } from "../../store/api-actions";
import { ITreeElement } from "../../const";

const Form = styled.form`
  display: flex;
  flex-direction column;
`;
const TextInput = styled.input`
`;
const InputLabel = styled.label``;
const SelectInput = styled.select``;

interface IChangeForma {
  treeItem: ITreeElement,
  changeBtnClickHandler: () => void
};

const ChangeForm: React.FC<IChangeForma> = ({ treeItem, changeBtnClickHandler }: IChangeForma) => {
  interface IFormData {
    title: string,
    main: boolean
  };
  const { title, main } = treeItem;
  const [formData, setFormData] = React.useState<IFormData>({ title, main });
  const dispatch = useDispatch();

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
    changeBtnClickHandler();
  }, [dispatch, formData, treeItem, changeBtnClickHandler]);

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
      <Button id={"Submit"} clickHandler={handleClick} text={"Изменить"}></Button>
    </Form>
  );
};

export default ChangeForm;
