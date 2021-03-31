import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchData } from "../../store/api-actions";
import List from "../list/list";

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

  return <List />;
};
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  loadData() {
    dispatch(fetchData())
  }
});

export default connect(null, mapDispatchToProps)(Main);
