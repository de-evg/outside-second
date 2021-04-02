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
`;
const InputLabel = styled.label``;
const Container = styled.div`
  display: flex;
  width: 50%;
  margin-bottom: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 25%;
  margin-bottom: 10px;
`;

// Сортировка данных AZ или ZA с учетом регистра и без
const SortForm: React.FC = () => {
  const dispatch = useDispatch();
  const sortType: string = useSelector((state: RootStateOrAny) => state.TREE.sortType);
  const withRegister: boolean = useSelector((state: RootStateOrAny) => state.TREE.withRegister);

  const [sortSettings, setSortSettings] = React.useState({ sortType, withRegister });
  const handleInputChange = React.useCallback((evt) => {
    let { value } = evt.target;
    if (evt.target.type === "checkbox") {
      value = evt.target.checked;
    }
    setSortSettings({ ...sortSettings, [evt.target.name]: value })

  }, [sortSettings]);

  React.useEffect(() => {
    dispatch(ActionCreator.changeSort(sortSettings))
  }, [sortSettings, dispatch])

  return (
    <Form>
      <Container>
        <Wrapper>
          <InputLabel htmlFor="AZ">A-Z</InputLabel>
          <TextInput onChange={handleInputChange} value="AZ" defaultChecked={true} type="radio" name="sortType" id="AZ" />
        </Wrapper>
        <Wrapper>
          <InputLabel htmlFor="ZA">Z-A</InputLabel>
          <TextInput onChange={handleInputChange} value="ZA" type="radio" name="sortType" id="ZA" />
        </Wrapper>
      </Container>
      <Wrapper>
        <InputLabel htmlFor="register">Register</InputLabel>
        <TextInput onChange={handleInputChange} checked={withRegister} type="checkbox" name="withRegister" id="register" />
      </Wrapper>
    </Form>
  );
};

export default SortForm;
