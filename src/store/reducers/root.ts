import { combineReducers } from "redux";
import {treeData} from "./tree/tree";

export const NameSpace = {
  TREE: "TREE"
};

export default combineReducers({
  [NameSpace.TREE]: treeData
});