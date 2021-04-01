import { APIRoute } from "../const";
import { ActionCreator } from "./actions";

export const fetchData = () => (dispatch: (arg0: any) => any, _getState: any, api: { get: (arg0: string) => Promise<any>; }) =>
  api
    .get(APIRoute.GET)
    .then((response: any) => dispatch(ActionCreator.loadData(response.data)));

export const deleteData = (id: string) => (dispatch: (arg0: any) => any, _getState: any, api: { delete: (arg0: string) => Promise<any>; }) =>
  api
    .delete(`${APIRoute.DELETE}/${id}`)
    .then(() => dispatch(ActionCreator.deleteData(id)))
    .catch(() => dispatch(ActionCreator.deleteError()));

export const postData = (body: { title: string, main: boolean }) => (dispatch: (arg0: any) => any, _getState: any, api: {
  post: (arg0: string, arg1: { title: string, main: boolean }) => Promise<any>;
}) =>
  api
    .post(APIRoute.POST, body)
    .then((response) => dispatch(ActionCreator.addData(response.data)));

export const updateData = (url: string, body: { title: string, main: boolean }) => (dispatch: (arg0: any) => any, _getState: any, api: {
      put: (arg0: string, arg1: { title: string, main: boolean }) => Promise<any>;
    }) =>
      api
        .put(`${APIRoute.PUT}/${url}`, body)
        .then((response) => dispatch(ActionCreator.updateData(response.data)));