import { Dispatch } from 'redux';
import { APIRoute, ITreeElement } from "../const";
import { ActionCreator, ILoadData } from "./actions";

export const fetchData = () => (dispatch: Dispatch, _getState: () => void, api: { get: (arg0: string) => Promise<{ data: ILoadData }>; }) =>
  api
    .get(APIRoute.GET)
    .then((response: { data: ILoadData; }) => dispatch(ActionCreator.loadData(response.data)))
    .catch(() => dispatch(ActionCreator.fetchError({loadError: {id: "", error: true}})));

export const deleteData = (id: string) => (dispatch: Dispatch, _getState: () => void, api: { delete: (arg0: string) => Promise<void>; }) =>
  api
    .delete(`${APIRoute.DELETE}/${id}`)
    .then(() => dispatch(ActionCreator.deleteData(id)))
    .catch(() => dispatch(ActionCreator.fetchError({deleteError: {id, error: true}})));

export const postData = (body: { title: string, main: boolean }) => (dispatch: Dispatch, _getState: () => void, api: {
  post: (arg0: string, arg1: { title: string, main: boolean }) => Promise<{ data: ITreeElement; }>;
}) =>
  api
    .post(APIRoute.POST, body)
    .then((response: { data: ITreeElement; }) => dispatch(ActionCreator.addData(response.data)))
    .catch(() => dispatch(ActionCreator.fetchError({postError: {id: "", error: true}})));

export const updateData = (url: string, body: { title: string, main: boolean }) => (dispatch: Dispatch, _getState: () => void, api: {
  put: (arg0: string, arg1: { title: string, main: boolean }) => Promise<{ data: ITreeElement; }>;
}) =>
  api
    .put(`${APIRoute.PUT}/${url}`, body)
    .then((response: { data: ITreeElement; }) => dispatch(ActionCreator.updateData(response.data)))
    .catch(() => dispatch(ActionCreator.fetchError({updateError: {id: url, error: true}})));