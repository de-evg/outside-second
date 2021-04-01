import { ITreeElement } from "../const";

const ActionType = {
  GET_TREE: 'GET_TREE',
  DELETE: 'DELETE',
  DELETE_ERROR: 'DELETE_ERROR',
  ADD_DATA: 'ADD_DATA',
  UPDATE_DATA: 'UPDATE_DATA',
  CHANGE_SORT: 'CHANGE_SORT',
  CHANGE_FILTER: 'CHANGE_FILTER'
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
  }),
  changeSort: (newSortType: { withRegister: boolean, sortType: string }) => ({
    type: ActionType.CHANGE_SORT,
    payload: newSortType
  }),
  updateFilter: (filter: string) => ({
    type: ActionType.CHANGE_FILTER,
    payload: filter
  })
};

export { ActionType, ActionCreator };