import * as React from "react";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { ActionCreator } from "../../store/actions";
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
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  loadData() {
    dispatch(ActionCreator.loadData())
  }
});

export default connect(null, mapDispatchToProps)(Main);
