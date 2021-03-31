interface IItem {  
    id: string,
    title: string,
    main: boolean
};

interface ITree {
  [name: string]: IItem[]
};

const generateTree = (list: IItem[]) => {
  const tree = {};
  return list.reduce((tree: ITree, item: IItem) => {
    const branchName = item.title.slice(0, 1);
    tree[branchName] = tree[branchName] || [];
    tree[branchName].push(item);
    if (tree[branchName].length > 1) {
      tree[branchName].sort((itemA: IItem, itemB: IItem) => itemA.title > itemB.title ? 1 : -1);
    }
    return tree;
  }, tree);
};

export {generateTree}