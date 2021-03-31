const ActionType = {
  GET_TREE: 'GET_TREE'
};

const ActionCreator = {
  loadData: () => ({
    type: ActionType.GET_TREE
  })
};

export { ActionType, ActionCreator };