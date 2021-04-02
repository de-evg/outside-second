import * as React from "react";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../button/button";
import { postData } from "../../store/api-actions";
import { ActionCreator } from "../../store/actions";

const Form = styled.form`
  display: flex;
  flex-direction column;
  margin-bottom: 10px;
  backgound-color: #AAAAAA;
`;
const TextInput = styled.input`
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  width: 50px;`;

const InputLabel = styled.label``;

//Форма добавления нового элемента
const AddForm: React.FC = () => {
  interface IFormData {
    title: string,
    main: boolean
  }
  const [formData, setFormData] = React.useState<IFormData>({ title: "", main: true });
  const dispatch = useDispatch();
  const postError: { id: string, error: boolean } = useSelector((state: RootStateOrAny) => state.TREE.postError);

  const handleInputChange = React.useCallback((evt) => {
    let { value } = evt.target;
    setFormData({ ...formData, [evt.target.id]: value });
  }, [formData])

  const handleClick = React.useCallback((evt) => {
    evt.preventDefault();
    dispatch(postData(formData));
    if (!postError) {
      dispatch(ActionCreator.fetchError({ postError: { id: "", error: false } }));
    }
    setFormData({ ...formData, title: "" });

  }, [dispatch, formData, postError]);

  return (
    <Form >
      <InputLabel htmlFor="title">Введите имя новой строки:</InputLabel>
      <TextInput onChange={handleInputChange} value={formData.title} type="text" id="title" />
      <Wrapper>
        <Button id={"Submit"} clickHandler={handleClick} isError={postError.error} text={"Добавить"} isDisabled={!formData.title}></Button>
      </Wrapper>
    </Form>
  );
};

export default AddForm;
