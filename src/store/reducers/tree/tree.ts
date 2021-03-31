import { Reducer } from "redux";
import { generateTree } from "../../../helpers/list";
import { ActionType } from "../../actions";

interface ITreeBranchElement {
  _id: number,
  title: string,
  main: boolean
};

interface ITreeBranch {
  [branchName: string]: ITreeBranchElement[]
};

export interface ITreeState {
  tree: ITreeBranch | null
};

const initialState = {
  tree: null
};

export const treeData: Reducer<ITreeState> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_TREE:
      const tree = generateTree(action.payload);
      return {...state, tree};
    default: return state;
  };
};