import * as React from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ActionCreator } from "../../store/actions";

const Form = styled.form`
  display: flex;
  flex-direction column;
  margin-bottom: 10px;
`;
const TextInput = styled.input`
  margin-bottom: 10px;
`;

const InputLabel = styled.label``;

const SearchForm: React.FC = () => {

  const dispatch = useDispatch();
  const filter: string = useSelector((state: RootStateOrAny) => state.TREE.filter);
  const [row, setRow] = React.useState("");

  const handleInputChange = React.useCallback((evt) => {
    setRow(evt.target.value);
  }, []);



  React.useEffect(() => {
    dispatch(ActionCreator.updateFilter(row));
  }, [row, dispatch]);

  return (
    <Form >
      <InputLabel htmlFor="title">Что ищем?</InputLabel>
      <TextInput onChange={handleInputChange} value={filter} type="text" id="title" />
    </Form>
  );
};

export default SearchForm;
