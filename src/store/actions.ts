const ActionType = {
  GET_TREE: 'GET_TREE'
};

interface ITreeElement {
  id: number,
  title: string,
  main: boolean
}; 

interface ILoadData {
  data: ITreeElement[]
}

const ActionCreator = {
  loadData: (data: ILoadData) => ({
    type: ActionType.GET_TREE,
    payload: data
  })
};

export { ActionType, ActionCreator };