import * as React from "react";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import AddForm from "../add-form/add-form";
import SortForm from "../sort-form/sort-form";
import List from "../list/list";
import SearchForm from "../search-form/search-form";
import { fetchData } from "../../store/api-actions";

const Wrapper = styled.div`
  margin 0 auto;
  padding: 10px 0;
  width: 500px;
`;

const ErrorMessage = styled.p`
text-align: center;
`;

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const loadError: { id: string, error: boolean } = useSelector((state: RootStateOrAny) => state.TREE.loadError);
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchData())
      setIsDataLoaded(true);
    }
  }, [dispatch, isDataLoaded]);

  return (
    <Wrapper>
      {
        loadError.error
          ? <ErrorMessage>Не удалось загрузить данные</ErrorMessage>
          : <>
            <SortForm />
            <SearchForm />
            <AddForm />
            <List />
          </>
      }

    </Wrapper>
  );
};

export default Main;
