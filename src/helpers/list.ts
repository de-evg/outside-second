import { ITreeElement } from "../const";

interface ITree {
  [name: string]: ITreeElement[]
};

const generateTree = (list: ITreeElement[]) => {
  const tree = {};
  return list.reduce((tree: ITree, item: ITreeElement) => {
    const branchName = item.title.slice(0, 1).toUpperCase();
    tree[branchName] = tree[branchName] || [];
    tree[branchName].push(item);
    if (tree[branchName].length > 1) {
      tree[branchName].sort((itemA: ITreeElement, itemB: ITreeElement) => itemA.title.toLocaleLowerCase() > itemB.title.toLocaleLowerCase() ? 1 : -1);
    }
    return tree;
  }, tree);
};

export { generateTree };