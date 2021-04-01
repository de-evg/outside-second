import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import styled from "styled-components";
import AddForm from "../add-form/add-form";
import { fetchData } from "../../store/api-actions";
import List from "../list/list";


const Wrapper = styled.div`
  margin 0 auto;
  padding: 10px 0;
  width: 500px;
`;
interface IMain {
  loadData: () => void
};

const Main: React.FC<IMain> = ({ loadData }) => {
  const [isDataLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!isDataLoaded) {
      loadData();
    }
  }, [isDataLoaded, loadData]);

  return (
    <Wrapper>
      <List /> 
      <AddForm />
    </Wrapper>
  );
};
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  loadData() {
    dispatch(fetchData())
  }
});

export default connect(null, mapDispatchToProps)(Main);
