import { ITreeElement, SortType } from "../const";

interface ITree {
  [name: string]: ITreeElement[]
};

const generateTree = (list: ITreeElement[], sortType: string, withRegister: boolean, filter: string) => {
  const tree = list.reduce((tree: ITree, item: ITreeElement) => {
    const findedSubstr = withRegister ? item.title.includes(filter) : item.title.toLowerCase().includes(filter.toLowerCase());
    if (!filter || findedSubstr) {
      const branchName = item.title.slice(0, 1).toUpperCase();
      tree[branchName] = tree[branchName] || [];
      tree[branchName].push(item);
    }

    return tree;
  }, {});

  const sortTree = (tree: ITree, sortType: string, withRegister: boolean) => {
    const treeKeys = Object.keys(tree);
    treeKeys.forEach((treeKey) => {
      withRegister
        ? tree[treeKey].sort((itemA: ITreeElement, itemB: ITreeElement) => {
          if (sortType === SortType.AZ) {
            return itemA.title > itemB.title ? 1 : -1
          }
          return itemA.title < itemB.title ? 1 : -1
        })
        : tree[treeKey].sort((itemA: ITreeElement, itemB: ITreeElement) => {
          if (sortType === SortType.AZ) {
            return itemA.title.toLocaleLowerCase() > itemB.title.toLocaleLowerCase() ? 1 : -1
          }
          return itemA.title.toLocaleLowerCase() < itemB.title.toLocaleLowerCase() ? 1 : -1
        })
    });
  }
  sortTree(tree, sortType, withRegister);
  return tree;
};

export { generateTree };