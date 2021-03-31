import { Reducer } from "redux";
import { generateTree } from "../../../helpers/list";
import { mock } from "../../../mock/mock";
import { ActionType } from "../../actions";

interface ITreeBranchElement {
  id: number,
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
      const tree = generateTree(mock);
      return {...state, tree};
    default: return state;
  };
};