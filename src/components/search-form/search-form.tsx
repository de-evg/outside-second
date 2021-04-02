import * as React from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import styledComponents from "styled-components";
import { ActionCreator } from "../../store/actions";

const Form = styledComponents.form`
  display: flex;
  flex-direction column;
  margin-bottom: 10px;
`;
const TextInput = styledComponents.input`
  margin-bottom: 10px;
`;

const InputLabel = styledComponents.label``;

// Поиск данных содержащих текст введенной строки в title 
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
