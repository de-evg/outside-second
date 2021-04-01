import { Reducer } from "redux";
import { generateTree } from "../../../helpers/list";
import { ActionType } from "../../actions";
import { ITreeElement } from "../../../const";

interface ITreeBranch {
  [branchName: string]: ITreeElement[]
};

export interface ITreeState {
  tree: ITreeBranch | {},
  origin: ITreeElement[],
  isDeleteError: boolean,
  sortType: string,
  withRegister: boolean,
  filter: string
};

const initialState = {
  tree: {},
  origin: [],
  isDeleteError: false,
  sortType: "AZ",
  withRegister: false,
  filter: ""
};

export const treeData: Reducer<ITreeState> = (state = initialState, action) => {
  const { origin, sortType, withRegister, filter } = state;
  let updatedOrigin;
  switch (action.type) {
    case ActionType.GET_TREE:
      const tree = generateTree(action.payload, sortType, withRegister, filter);
      return { ...state, tree, origin: action.payload };

    case ActionType.DELETE:
      const deleteFromOrigin = (update: string, origin: ITreeElement[]) => {
        let items = [...origin];
        const index = items!.findIndex((item) => item._id === update);

        if (index === -1) {
          throw new Error(`Can't update unexisting item`);
        }

        return items = [
          ...items!.slice(0, index),
          ...items!.slice(index + 1)
        ];
      };

      updatedOrigin = deleteFromOrigin(action.payload, origin);
      const newTree = generateTree(updatedOrigin, sortType, withRegister, filter);
      return { ...state, tree: newTree, origin: updatedOrigin, isDeleted: false };

    case ActionType.DELETE_ERROR:
      return { ...state, isDeleteError: true };

    case ActionType.ADD_DATA:
      const newOrigin = [...origin, action.payload];
      return { ...state, origin: newOrigin, tree: generateTree(newOrigin, sortType, withRegister, filter) };

    case ActionType.UPDATE_DATA:
      const updateOrigin = (update: ITreeElement, origin: ITreeElement[]) => {
        let items = [...origin];
        const index = items!.findIndex((item) => item._id === update._id);

        if (index === -1) {
          throw new Error(`Can't update unexisting item`);
        }

        return items = [
          ...items!.slice(0, index),
          update,
          ...items!.slice(index + 1)
        ];
      };
      updatedOrigin = updateOrigin(action.payload, origin);
      const updatedTree = generateTree(updatedOrigin, sortType, withRegister, filter);
      return { ...state, origin: updatedOrigin, tree: updatedTree };

    case ActionType.CHANGE_SORT:
      return { ...state, ...action.payload, tree: generateTree(origin, action.payload.sortType, action.payload.withRegister, filter) };

    case ActionType.CHANGE_FILTER:

      return { ...state, filter: action.payload, tree: generateTree(origin, sortType, withRegister, action.payload) };

    default: return state;
  };
};