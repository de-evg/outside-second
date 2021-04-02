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
  deleteError: {id: string, error: boolean},
  postError: {id: string, error: boolean},
  loadError: {id: string, error: boolean},
  updateError: {id: string, error: boolean},
  sortType: string,
  withRegister: boolean,
  filter: string
};

const initialState = {
  tree: {},
  origin: [],
  fetchError: false,
  sortType: "AZ",
  withRegister: false,
  filter: "",
  deleteError: {id: "", error: false},
  postError: {id: "", error: false},
  loadError: {id: "", error: false},
  updateError: {id: "", error: false},
};

export const treeData: Reducer<ITreeState> = (state = initialState, action) => {
  const { origin, sortType, withRegister, filter } = state;
  let updatedOrigin;
  let newTree;
  
  switch (action.type) {
    case ActionType.GET_TREE:
      const tree = generateTree(action.payload, sortType, withRegister, filter);
      return { ...state, tree, origin: action.payload, loadError: {id: "", error: false} };

    case ActionType.DELETE:
      const index = state.origin.findIndex((item) => item._id === action.payload);
      const findedItem = state.origin[index];

      const deleteFromOrigin = (update: string, origin: ITreeElement[], index: number) => {
        let items = [...origin];       

        if (index === -1) {
          throw new Error(`Can't update unexisting item`);
        }

        return items = [
          ...items!.slice(0, index),
          ...items!.slice(index + 1)
        ];
      };
      updatedOrigin = deleteFromOrigin(action.payload, origin, index);
      const deleteFromTree = (update: string, tree: ITreeBranch) => {
        const copyTree = {...tree};
        const branchName = findedItem.title.slice(0, 1).toUpperCase();
        const indexInBranch = copyTree[branchName].findIndex((item: { _id: string; }) => item._id === update);
        copyTree[branchName] = [
          ...copyTree[branchName].slice(0, indexInBranch),
          ...copyTree[branchName].slice(indexInBranch + 1),
        ];
        if (!copyTree[branchName].length) {
          delete copyTree[branchName];
        }
        return copyTree
      }
      newTree = deleteFromTree(action.payload, state.tree);
      return { ...state, tree: newTree, origin: updatedOrigin, deleteError: {id: "", error: false} };

    case ActionType.FETCH_ERROR:
      return { ...state, ...action.payload };

    case ActionType.ADD_DATA:
      const newOrigin = [...origin, action.payload];
      const addToTree = (update: ITreeElement, tree: ITreeBranch) => {
        const copyTree = {...tree};
        const branchName = update.title.slice(0, 1).toUpperCase();
        copyTree[branchName] = copyTree[branchName] || [];
        copyTree[branchName] = [
          ...copyTree[branchName],
          update
        ];
        return copyTree
      }
      newTree = addToTree(action.payload, state.tree);
      return { ...state, origin: newOrigin, tree: newTree, postError: {id: "", error: false} };

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
      const updateInTree = (update: ITreeElement, tree: ITreeBranch) => {
        const copyTree = {...tree};
        const branchName = update.title.slice(0, 1).toUpperCase();
        const indexInBranch = copyTree[branchName].findIndex((item: { _id: string; }) => item._id === update._id);
        copyTree[branchName] = [
          ...copyTree[branchName].slice(0, indexInBranch),
          update,
          ...copyTree[branchName].slice(indexInBranch + 1),
        ];
        return copyTree
      };
      const updatedTree = updateInTree(action.payload, state.tree);
      return { ...state, origin: updatedOrigin, tree: updatedTree, updateError: {id: "", error: false} };

    case ActionType.CHANGE_SORT:
      return { ...state, ...action.payload, 
        tree: generateTree(origin, action.payload.sortType, action.payload.withRegister, filter) };

    case ActionType.CHANGE_FILTER:
      return { ...state, filter: action.payload, 
        tree: generateTree(origin, sortType, withRegister, action.payload) };

    default: return state;
  };
};