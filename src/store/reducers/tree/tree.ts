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
  isDeleteError: boolean
};

const initialState = {
  tree: {},
  origin: [],
  isDeleteError: false
};

export const treeData: Reducer<ITreeState> = (state = initialState, action) => {
  let updatedOrigin;
  switch (action.type) {
    case ActionType.GET_TREE:
      const tree = generateTree(action.payload);
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
      
      updatedOrigin = deleteFromOrigin(action.payload, state.origin);
      const newTree = generateTree(updatedOrigin);
      return { ...state, tree: newTree, origin: updatedOrigin, isDeleted: false };

    case ActionType.DELETE_ERROR:
      return { ...state, isDeleteError: true };

    case ActionType.ADD_DATA:
      const newOrigin = [...state.origin, action.payload];
      return { ...state, origin: newOrigin, tree: generateTree(newOrigin) };

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
      updatedOrigin = updateOrigin(action.payload, state.origin);
      const updatedTree = generateTree(updatedOrigin);
      return { ...state, origin: updatedOrigin, tree: updatedTree };

    default: return state;
  };
};