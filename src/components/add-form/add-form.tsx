import * as React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../button/button";
import { postData } from "../../store/api-actions";

const AddFrm = styled.form`
  display: flex;
  flex-direction column;
`;
const TextInput = styled.input`
  
`;

const InputLabel = styled.label``;

const AddForm: React.FC = () => {
  interface IFormData {
    title: string,
    main: boolean
  }
  const [formData, setFormData] = React.useState<IFormData>({ title: "", main: true});
  const dispatch = useDispatch();

  const handleInputChange = React.useCallback((evt) => {
    let {value} = evt.target;
    setFormData({...formData, [evt.target.id]: value });
  }, [formData])

  const handleClick = React.useCallback((evt) => {
    evt.preventDefault();
    dispatch(postData(formData));
    setFormData({...formData, title: "" });
  }, [dispatch, formData]);
  return (
      <AddFrm >
        <InputLabel htmlFor="title">Title</InputLabel>
        <TextInput onChange={handleInputChange} value={formData.title} type="text" id="title" />        

        <Button id={"Submit"} clickHandler={handleClick} text={"Добавить"}></Button>
      </AddFrm>
  );
};

export default AddForm;
