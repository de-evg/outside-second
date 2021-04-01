import { ITreeElement } from "../const";

const ActionType = {
  GET_TREE: 'GET_TREE',
  DELETE: 'DELETE',
  DELETE_ERROR: 'DELETE_ERROR',
  ADD_DATA: 'ADD_DATA',
  UPDATE_DATA: 'UPDATE_DATA'
};

interface ILoadData {
  data: ITreeElement[]
}

const ActionCreator = {
  loadData: (data: ILoadData) => ({
    type: ActionType.GET_TREE,
    payload: data
  }),
  deleteData: (id: string) => ({
    type: ActionType.DELETE,
    payload: id
  }),
  deleteError: () => ({
    type: ActionType.DELETE_ERROR,
  }),
  addData: (data: ITreeElement) => ({
    type: ActionType.ADD_DATA,
    payload: data
  }),
  updateData: (data: ITreeElement) => ({
    type: ActionType.UPDATE_DATA,
    payload: data
  })
};

export { ActionType, ActionCreator };