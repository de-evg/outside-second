import { APIRoute } from "../const";
import { ActionCreator } from "./actions";

export const fetchData = () => (dispatch: (arg0: any) => any, _getState: any, api: { getData: (arg0: any) => Promise<any>; }) =>
  api
    .getData(APIRoute.GET)
    .then((data: any) => dispatch(ActionCreator.loadData(data)));
